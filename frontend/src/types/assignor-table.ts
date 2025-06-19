import type { Assignor } from './assignor'

export interface AssignorTableProps {
  assignors?: Assignor[]
  onEdit: (assignor: Assignor) => void
  onDelete: (assignor: Assignor) => void
}
