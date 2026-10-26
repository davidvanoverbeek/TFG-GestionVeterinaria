import { useState } from 'react'
import { guardarSesion, borrarSesion, leerSesion, request } from '../api/client'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leerSesion()?.usuario ?? null)

  async function autenticar(ruta, datos) {
    const respuesta = await request(ruta, { method: 'POST', body: datos })
    guardarSesion(respuesta.token, respuesta.usuario)
    setUsuario(respuesta.usuario)
  }

  const login = (email, password) =>
    autenticar('/usuarios/login', { email, password })

  const registro = (nombre, email, password) =>
    autenticar('/usuarios/registro', { nombre, email, password })

  function logout() {
    borrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  )
}