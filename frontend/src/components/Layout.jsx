import { Outlet } from 'react-router-dom';
import Navbar from './NAvbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="contenido">
        <Outlet />
      </main>
    </>
  )
}