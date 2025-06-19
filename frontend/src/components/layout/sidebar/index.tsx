import { ChartNoAxesCombinedIcon, DollarSign, UserCheck2 } from 'lucide-react'
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AppSidebar() {
   return (
      <Sidebar collapsible="icon">
         <SidebarHeader className="mb-2 mt-2 px-4 py-6">
            <img src="/logo.png" className="w-[30px]"></img>
         </SidebarHeader>
         <SidebarContent>
            <ScrollArea className="h-full w-full">
               <SidebarGroup>
                  <SidebarGroupLabel>Início</SidebarGroupLabel>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        <Link to="/app/home">
                           <SidebarMenuButton tooltip="Dashboard">
                              <ChartNoAxesCombinedIcon />
                              <span>Dashboard</span>
                           </SidebarMenuButton>
                        </Link>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroup>
               <SidebarGroup>
                  <SidebarGroupLabel>Cadastros</SidebarGroupLabel>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        <Link to="/app/payables">
                           <SidebarMenuButton tooltip="Pagáveis">
                              <DollarSign />
                              <span>Pagáveis</span>
                           </SidebarMenuButton>
                        </Link>
                     </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link to="/app/assignors">
                           <SidebarMenuButton tooltip="Cedente">
                              <UserCheck2 />
                              <span>Cedentes</span>
                           </SidebarMenuButton>
                        </Link>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroup>
            </ScrollArea>
         </SidebarContent>
      </Sidebar>
   )
}
