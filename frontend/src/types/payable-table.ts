import type { Assignor } from './assignor'
import type { Payable } from './payable'

export interface PayableTableProps {
  payables?: Payable[]
  assignors?: Assignor[]
}
