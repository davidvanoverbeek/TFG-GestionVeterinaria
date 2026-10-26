import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <Link to="/" className="navbar__logo">
          Gestión de Mascotas
        </Link>

        {usuario && (
          <nav className="navbar__nav" aria-label="Principal">
            <NavLink to="/mascotas" className="navbar__enlace">
              Mis mascotas
            </NavLink>
            <button
              type="button"
              className="navbar__enlace navbar__salir"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}