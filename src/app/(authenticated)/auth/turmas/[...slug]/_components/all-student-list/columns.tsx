import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { type UserPreview } from '@/services/user/types'

export const columns: ColumnDef<UserPreview>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Estudante',
    cell: ({ row }) => (
      <div className="text-nowrap py-2 capitalize">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => (
      <div className="text-nowrap py-2">{row.getValue('email')}</div>
    ),
  },
]
