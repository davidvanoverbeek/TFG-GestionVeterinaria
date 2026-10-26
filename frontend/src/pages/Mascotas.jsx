import { useAuth } from '../hooks/useAuth'

export default function Mascotas() {
  const { usuario } = useAuth()

  return (
    <section>
      <h1 className="pagina__titulo">Mis mascotas</h1>
      <p>Hola, {usuario.nombre}. Aquí aparecerá el listado de tus mascotas.</p>
    </section>
  )
}