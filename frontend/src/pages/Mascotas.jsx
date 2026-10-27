import { useEffect, useState } from 'react'
import { request } from '../api/client'

function edad(fecha) {
  if (!fecha) return null
  const nac = new Date(fecha)
  if (Number.isNaN(nac.getTime())) return null
  const hoy = new Date()
  let años = hoy.getFullYear() - nac.getFullYear()
  const m = hoy.getMonth() - nac.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) años--
  return años < 1 ? 'Menos de 1 año' : `${años} ${años === 1 ? 'año' : 'años'}`
}

export default function Mascotas() {
  const [mascotas, setMascotas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true
    request('/mascotas')
      .then((datos) => {
        if (!activo) return
        setMascotas(Array.isArray(datos) ? datos : datos.mascotas ?? [])
      })
      .catch((e) => activo && setError(e.message || 'No se pudieron cargar las mascotas'))
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [])

  if (cargando) return <p role="status">Cargando mascotas…</p>
  if (error) return <p role="alert" className="form__error">{error}</p>

  return (
    <section className="mascotas">
      <h1>Mis mascotas</h1>

      {mascotas.length === 0 ? (
        <p>Todavía no tienes mascotas registradas.</p>
      ) : (
        <ul className="mascotas__lista">
          {mascotas.map((m) => (
            <li key={m._id} className="tarjeta">
              <h2 className="tarjeta__titulo">{m.nombre}</h2>
              <p className="tarjeta__dato">
                {[m.especie, m.raza].filter(Boolean).join(' · ')}
              </p>
              {edad(m.fechaNacimiento) && (
                <p className="tarjeta__dato">{edad(m.fechaNacimiento)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}