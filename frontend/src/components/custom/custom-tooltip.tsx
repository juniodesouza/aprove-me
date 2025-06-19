import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip'

interface CustomTooltipProps {
   children: React.ReactNode
   title: string
}

export default function CustomTooltip({ children, title }: CustomTooltipProps) {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
               <p>{title}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
