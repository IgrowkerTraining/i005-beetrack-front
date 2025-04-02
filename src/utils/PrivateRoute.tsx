import { Navigate, Outlet } from 'react-router-dom'

type Props = {
  isAuthenticated: boolean
}

const PrivateRoute = ({ isAuthenticated }: Props) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute