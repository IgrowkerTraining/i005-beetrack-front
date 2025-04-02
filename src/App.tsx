import { Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './utils/PrivateRoute'
import DashboardLayout from './layout/DashboardLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const isAuthenticated = true // Cuando tengamos la lógica de atenticación cambiamos esto ;-)
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
