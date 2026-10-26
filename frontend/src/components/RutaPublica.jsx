import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Login y registro: si ya hay sesión, se redirige a "Mis mascotas"
export default function RutaPublica() {
  const { usuario } = useAuth()
  return usuario ? <Navigate to="/mascotas" replace /> : <Outlet />
}