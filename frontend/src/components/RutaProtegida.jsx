import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Solo deja pasar a usuarios con sesión iniciada
export default function RutaProtegida() {
  const { usuario } = useAuth()
  return usuario ? <Outlet /> : <Navigate to="/login" replace />
}