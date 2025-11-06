
// Simulação de autenticação com JWT simples (header.payload.signature) e expiração.
function b64(obj){ return btoa(JSON.stringify(obj)) }

export function makeToken(payload, ttlSeconds=3600){
  const header = { alg:'HS256', typ:'JWT' }
  const exp = Math.floor(Date.now()/1000) + ttlSeconds
  const body = { ...payload, exp }
  return `${b64(header)}.${b64(body)}.mocksignature`
}

export function parseToken(token){
  if(!token) return null
  try{
    const [,payload] = token.split('.')
    return JSON.parse(atob(payload))
  }catch(e){ return null }
}

export async function loginApi(email, password){
  const user = { id: 1, name: 'Admin SMPM', email: 'admin@smpm.com', role: 'gestor' }
  if(email === 'admin@smpm.com' && password === '123456'){
    const token = makeToken({ sub: user.id, email: user.email })
    return { token, user }
  }
  const err = new Error('Credenciais inválidas')
  err.status = 401
  throw err
}
