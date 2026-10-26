import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)

    try {
      await login(email, password)
      navigate('/mascotas', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="auth">
      <h1 className="auth__titulo">Iniciar sesión</h1>

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="campo">
          <label className="campo__etiqueta" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="campo__input"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label className="campo__etiqueta" htmlFor="password">
            Contraseña
          </label>
          <input
            className="campo__input"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="mensaje mensaje--error" role="alert">
            {error}
          </p>
        )}

        <button className="btn btn--primario btn--bloque" disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      <p className="auth__pie">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </section>
  )
}