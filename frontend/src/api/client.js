const TOKEN_KEY = 'token'
const USER_KEY = 'usuario'

export function guardarSesion(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(usuario))
}

export function borrarSesion() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function leerSesion() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const usuario = JSON.parse(localStorage.getItem(USER_KEY))
    if (token && usuario) return { token, usuario }
  } catch {

  }
  borrarSesion()
  return null
}

export async function request(ruta, { method = 'GET', body } = {}) {
  const sesion = leerSesion()
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (sesion) headers.Authorization = `Bearer ${sesion.token}`

  let res
  try {
    res = await fetch(`/api${ruta}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('No se pudo conectar con el servidor')
  }

  const datos = await res.json().catch(() => null)

  if (res.status === 401 && sesion) {
    borrarSesion()
    window.location.assign('/login')
  }

  if (!res.ok) {
    const error = new Error(datos?.error || 'Error inesperado del servidor')
    error.status = res.status
    throw error
  }

  return datos
}