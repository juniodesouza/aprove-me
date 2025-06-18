import { PayableEdit } from '@/components/pages/payable/payable.edit'
import { PayableList } from '@/components/pages/payable/payable.list'
import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
   { path: 'payables', element: <PayableList /> },
   { path: 'payables/create', element: <PayableEdit /> },
   { path: 'payables/:id/edit', element: <PayableEdit /> },
]

export default routes
