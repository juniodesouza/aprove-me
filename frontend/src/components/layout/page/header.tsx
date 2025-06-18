import { cn } from '@/lib/utils'

interface PageHeaderProps {
   title: string
   description?: string
   actions?: JSX.Element
   className?: string
}

const PageHeader = ({
   title,
   description,
   actions,
   className,
}: PageHeaderProps) => {
   return (
      <div className={cn('flex items-end gap-2 pb-6 align-middle', className)}>
         <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
               <p className="text-sm text-muted-foreground">{description}</p>
            )}
         </div>
         <div>{actions}</div>
      </div>
   )
}

export { PageHeader }
