import { Navigate, RouteObject } from 'react-router-dom'
import { Home } from '../../components/pages/home/home'

const routes: RouteObject[] = [
   {
      path: '',
      element: <Navigate to="home" replace={true} />,
   },
   { path: 'home', element: <Home /> },
]

export default routes
