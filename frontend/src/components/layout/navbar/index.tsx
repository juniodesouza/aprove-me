import { LucideMenu } from 'lucide-react'
import UserMenu from './user-menu'
import { ModeToggle } from './theme-toogle'
import { useSidebar } from '@/components/ui/sidebar'

function Navbar() {
   const { toggleSidebar } = useSidebar()

   return (
      <header className="sticky top-0 z-10 flex h-14 items-center justify-start gap-4 border border-b bg-background px-5 shadow sm:border-0">
         <LucideMenu className="cursor-pointer" onClick={toggleSidebar} />
         <div className="relative ml-auto md:grow-0"></div>
         <ModeToggle />
         <UserMenu />
      </header>
   )
}

export default Navbar
