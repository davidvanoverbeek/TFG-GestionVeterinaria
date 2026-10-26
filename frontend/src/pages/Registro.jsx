import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Registro() {
  const { registro } = useAuth()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }

    setEnviando(true)
    try {
      await registro(nombre.trim(), email, password)
      navigate('/mascotas', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="auth">
      <h1 className="auth__titulo">Crear cuenta</h1>

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="campo">
          <label className="campo__etiqueta" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="campo__input"
            id="nombre"
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

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
            autoComplete="new-password"
            aria-describedby="ayuda-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="campo__ayuda" id="ayuda-password">
            Mínimo 6 caracteres
          </small>
        </div>

        <div className="campo">
          <label className="campo__etiqueta" htmlFor="confirmar">
            Repetir contraseña
          </label>
          <input
            className="campo__input"
            id="confirmar"
            type="password"
            autoComplete="new-password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="mensaje mensaje--error" role="alert">
            {error}
          </p>
        )}

        <button className="btn btn--primario btn--bloque" disabled={enviando}>
          {enviando ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth__pie">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}