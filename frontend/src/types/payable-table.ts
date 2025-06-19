import type { Assignor } from './assignor'
import type { Payable } from './payable'

export interface PayableTableProps {
   payables?: Payable[]
   assignors?: Assignor[]
   onEdit: (payable: Payable) => void
   onDelete: (payable: Payable) => void
   onView: (payable: Payable) => void
}
