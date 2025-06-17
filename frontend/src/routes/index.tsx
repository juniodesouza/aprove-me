import {
   createBrowserRouter,
   Navigate,
   RouteObject,
   RouterProvider,
} from 'react-router-dom'
import Layout from '../components/layout'
import AuthProvider from '../contexts/auth.context'
import { Login } from '../components/pages/login/login'

type IModule<T> = {
   [filename: string]: {
      default: T
   }
}

function AppRouter() {
   const routesModules: IModule<RouteObject[]> = import.meta.glob(
      '@/routes/app/*.{ts,tsx}',
      {
         eager: true,
      }
   )

   const routesApp = Object.values(routesModules).reduce(
      (acc, module) => [...acc, ...module.default],
      [] as RouteObject[]
   )

   const routes: RouteObject[] = [
      { path: '/', element: <Navigate to="login" replace={true} /> },
      { path: '/login', element: <Login /> },
      {
         path: '/app',
         element: (
            <AuthProvider>
               <Layout />
            </AuthProvider>
         ),
         children: routesApp,
      },
   ]

   return <RouterProvider router={createBrowserRouter(routes)} />
}

export default AppRouter
