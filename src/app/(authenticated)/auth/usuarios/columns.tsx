'use client'

import { toast } from 'react-toastify'
import { EllipsisVertical, User } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { useUpdateUser } from './_hooks/use-update-user'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dropdown } from '@/components/ui/dropdown-menu'

import { type UserPreview } from '@/services/user/types'

export const columns: ColumnDef<UserPreview>[] = (() => {
  const { mutate: handleUpdateUser } = useUpdateUser()

  return [
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
        <div className="text-nowrap py-2 capitalize">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
      cell: ({ row }) => (
        <div className="text-nowrap py-2">{row.getValue('email')}</div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const userId = row.original.id
        const userRole = row.original.role

        return (
          <div className="">
            <Dropdown.Root>
              <Dropdown.Trigger asChild className="cursor-pointer">
                <Button size="icon" variant="outline">
                  <EllipsisVertical className="size-5" />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Content>
                <Dropdown.Sub>
                  <Dropdown.SubTrigger>Designar função</Dropdown.SubTrigger>

                  <Dropdown.SubContent>
                    <Dropdown.Item
                      onClick={() =>
                        handleUpdateUser(
                          {
                            id: userId,
                            data: { role: 'STUDENT' },
                          },
                          {
                            onSuccess: () => {
                              toast.success('Função designada com sucesso!')
                            },
                          },
                        )
                      }
                    >
                      Estudante
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleUpdateUser(
                          {
                            id: userId,
                            data: { role: 'PROFESSOR' },
                          },
                          {
                            onSuccess: () => {
                              toast.success('Função designada com sucesso!')
                            },
                          },
                        )
                      }
                    >
                      Professor(a)
                    </Dropdown.Item>
                  </Dropdown.SubContent>
                </Dropdown.Sub>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
        )
      },
    },
  ]
})()
