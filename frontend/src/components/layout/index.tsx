import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import Navbar from './navbar'
import AppSidebar from './sidebar'

export default function Layout() {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset className="overflow-y-auto bg-muted/75">
            <Navbar />
            <div className="w-full px-4 py-2">
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   )
}
