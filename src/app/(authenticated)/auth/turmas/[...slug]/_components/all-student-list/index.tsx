'use client'

import { useParams } from 'next/navigation'
import { SetStateAction, useState, Dispatch } from 'react'
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
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { IParams } from '@/types/params'
import { UserPreview } from '@/services/user/types'
import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetAllStudents } from '@/hooks/services/use-get-all-students'

import { columns } from './columns'
import { useCreateStudentsInTeam } from './_hooks/use-create-students-in-team'

type AllStudentsListProps = {
  refetch: () => void
  setShowDialog: Dispatch<SetStateAction<boolean>>
  setShowStudentsList: Dispatch<SetStateAction<boolean>>
}

export default function AllStudentsList({
  refetch,
  setShowDialog,
  setShowStudentsList,
}: AllStudentsListProps) {
  const params = useParams<IParams>()
  const { id } = normalizeSlug(params.slug)

  const { data: students } = useGetAllStudents({ teamId: id })
  const { mutate: handleCreateStudentsInTeam } = useCreateStudentsInTeam()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const data = (students ?? []) as UserPreview[]

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

  const onSubmitSelectedStudents = () => {
    const selectedStudents = Object.keys(rowSelection)

    handleCreateStudentsInTeam(
      {
        id,
        studentsIds: selectedStudents,
      },
      {
        onSuccess: () => {
          refetch()
          toast.success('Estudantes cadastrados com sucesso!')
          setShowDialog(false)
        },
        onError: () => {
          toast.error('Houve um erro ao cadastrar os estudantes!')
        },
      },
    )

    console.log(selectedStudents)
  }

  const selectedRowsLength = Object.keys(rowSelection).length
  const totalPages = Math.ceil(data.length / pagination.pageSize)

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex items-center">
          <Input
            placeholder="Pesquisar..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-10 max-w-sm"
          />
        </div>

        <div className="rounded-md border">
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

      <Dialog.Footer className="gap-y-4">
        <Dialog.Close asChild>
          <Button variant="outline">Cancelar</Button>
        </Dialog.Close>

        <Button
          variant="secondary"
          className="bg-zinc-200 hover:bg-zinc-200/80"
          onClick={() => setShowStudentsList((prev) => !prev)}
        >
          Novo estudante
        </Button>

        <Button
          type="button"
          className="w-full md:w-auto"
          onClick={onSubmitSelectedStudents}
        >
          Cadastrar selecionados
        </Button>
      </Dialog.Footer>
    </>
  )
}
