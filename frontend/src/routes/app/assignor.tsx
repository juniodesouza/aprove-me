import { AssignorEdit } from '@/components/pages/assignor/assignor.edit'
import { AssignorList } from '@/components/pages/assignor/assignor.list'
import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  { path: 'assignors', element: <AssignorList /> },
  { path: 'assignors/create', element: <AssignorEdit /> },
  { path: 'assignors/:id/edit', element: <AssignorEdit /> },
]

export default routes
