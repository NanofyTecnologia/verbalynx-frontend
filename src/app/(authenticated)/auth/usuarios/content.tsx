'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  PaginationState,
} from '@tanstack/react-table'

import { toast } from 'react-toastify'
import { EllipsisVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Dropdown } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { type UserPreview } from '@/services/user/types'
import { useGetAllStudents } from '@/hooks/services/use-get-all-students'

import { useUpdateUser } from './_hooks/use-update-user'
import { Select } from '@/components/ui/select'

const roleMap: { [key: string]: string } = {
  ADMIN: 'Administrador',
  STUDENT: 'Estudante',
  PROFESSOR: 'Professor(a)',
  PENDING_APPROVAL: 'Aguardando aprovação',
}

export default function Content() {
  const { back } = useRouter()
  const { data: students } = useGetAllStudents({ teamId: '' })
  const { mutate: handleUpdateUser } = useUpdateUser()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const data = (students ?? []) as UserPreview[]

  const columns: ColumnDef<UserPreview>[] = (() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        accessorKey: 'role',
        header: 'Função',
        cell: ({ row }) => (
          <div className="text-nowrap py-2">
            {roleMap[row.getValue('role') as string]}
          </div>
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

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRowsLength = Object.keys(rowSelection).length
  const totalPages = Math.ceil(data.length / pagination.pageSize)

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Usuários no sistema</h2>

        <div />
      </div>

      <div className="mt-4 w-full space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Pesquisar por nome..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-10 w-full"
          />

          <Select.Root
            onValueChange={(value) => {
              table
                .getColumn('role')
                ?.setFilterValue(value === 'ALL' ? '' : value)
            }}
          >
            <Select.Trigger className="h-10 max-w-48">
              <Select.Value placeholder="Filtrar função" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="ALL">Todos</Select.Item>

              {Object.keys(roleMap).map((item) => (
                <Select.Item key={item} value={String(item)}>
                  {roleMap[item]}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="rounded-md border bg-white">
          <Table.Root>
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Table.Head key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </Table.Head>
                    )
                  })}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Estudantes não encontrado
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
          <div className="border-t p-2">
            <div className="flex items-center">
              <p className="text-zinc-800">
                {selectedRowsLength} de {data.length} linhas selecionadas
              </p>

              <div className="ms-auto flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => table.previousPage()}
                  disabled={pagination.pageIndex === 0}
                >
                  <ChevronLeft className="size-5" />
                </Button>

                <p className="mx-1">{pagination.pageIndex + 1}</p>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => table.nextPage()}
                  disabled={totalPages === pagination.pageIndex + 1}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
