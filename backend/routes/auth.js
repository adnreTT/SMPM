
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const router = express.Router()

router.post('/register', async (req,res) => {
  try{
    const { name, email, password } = req.body
    if(!name || !email || !password) return res.status(400).json({ error: 'Dados obrigatórios' })
    const exists = await User.findOne({ email })
    if(exists) return res.status(409).json({ error: 'E-mail já cadastrado' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })
    return res.status(201).json({ id: user._id, name: user.name, email: user.email })
  }catch(e){
    return res.status(500).json({ error: 'Erro ao registrar' })
  }
})

router.post('/login', async (req,res) => {
  try{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!user) return res.status(401).json({ error: 'Credenciais inválidas' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if(!ok) return res.status(401).json({ error: 'Credenciais inválidas' })
    const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  }catch(e){
    return res.status(500).json({ error: 'Erro ao autenticar' })
  }
})

export default router
