import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RutaProtegida from './components/RutaProtegida'
import RutaPublica from './components/RutaPublica'
import Login from './pages/Login'
import Mascotas from './pages/Mascotas'
import Registro from './pages/Registro'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RutaPublica />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>

        <Route element={<RutaProtegida />}>
          <Route path="/mascotas" element={<Mascotas />} />
        </Route>

        <Route path="*" element={<Navigate to="/mascotas" replace />} />
      </Route>
    </Routes>
  )
}