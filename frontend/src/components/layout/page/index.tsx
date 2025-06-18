import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from './header'

interface PageProps {
   children: React.ReactNode
   title: string
   description?: string
   actions?: JSX.Element
}

export function Page({ children, title, description, actions }: PageProps) {
   return (
      <div>
         <PageHeader
            className="pt-6"
            title={title}
            description={description}
            actions={actions}
         />
         <Card>
            <CardContent className="p-4 pt-6">{children}</CardContent>
         </Card>
      </div>
   )
}
