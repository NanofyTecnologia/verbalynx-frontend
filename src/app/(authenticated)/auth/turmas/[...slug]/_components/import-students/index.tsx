import * as XLXS from 'xlsx'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { ChangeEvent, useCallback, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { IParams } from '@/types/params'
import { normalizeSlug } from '@/utils/normalize-slug'

import { useCreateStudents } from './use-create-students'

export default function ImportStudents() {
  const params = useParams<IParams>()
  const { id } = normalizeSlug(params.slug)

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<string[][]>([])
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const { mutate: handleCreateStudents } = useCreateStudents()

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const binaryStr = e.target?.result as string
        const workbook = XLXS.read(binaryStr, { type: 'binary' })

        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        const jsonData = XLXS.utils.sheet_to_json(sheet, {
          header: 1,
        }) as string[][]
        setData(jsonData)
      }

      reader.readAsBinaryString(file)
    }
  }

  const transformToObjects = (data: string[][]) => {
    if (data.length < 2) return []

    const headers = ['name', 'email', 'cpf', 'registrationCode', 'observation']

    const filteredData = data.filter((row) =>
      row.some((cell) => cell && cell.trim()),
    )

    return filteredData.map((row) => {
      return headers.reduce(
        (obj, header, index) => {
          if (header === 'registrationCode') {
            obj[header] = row[index] !== undefined ? String(row[index]) : null
          } else {
            obj[header] = row[index] || null
          }
          return obj
        },
        {} as Record<string, unknown>,
      )
    })
  }
  const handleAddStudents = useCallback(() => {
    setIsLoading(true)
    const students = transformToObjects(data.slice(1))

    handleCreateStudents(
      { id, students },
      {
        onSuccess: () => {
          toast.success('Estudantes importados com sucesso!')
          dialogCloseRef.current?.click()
          setIsLoading(false)
        },
        onError: () => {
          toast.error(
            'Ops! Houve um erro desconhecido ao importar os estudantes.',
          )
          setIsLoading(false)
        },
      },
    )
  }, [data])

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button className="w-full">
            Importar lista de estudantes (XLSX)
          </Button>
        </Dialog.Trigger>

        <Dialog.Content className="flex h-full flex-col md:max-h-96 md:overflow-y-auto">
          <Dialog.Header>
            <Dialog.Title>Importar lista de estudantes</Dialog.Title>
            <Dialog.Description>
              Selecione um arquivo XLSX para importar a lista de estudantes para
              esta turma.
            </Dialog.Description>
          </Dialog.Header>

          {data.length === 0 && (
            <div className="rounded-md p-2 text-center font-semibold">
              Nenhum arquivo selecionado
            </div>
          )}

          {data.length > 0 && (
            <div className="space-y-1">
              <h2>Confira os estudantes:</h2>
              <div className="overflow-x-auto rounded-md border">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      {data[0]?.map((header: string, index: number) => (
                        <Table.Head key={index}>{header}</Table.Head>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {data.slice(1).map((row, rowIndex) => (
                      <Table.Row key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => (
                          <Table.Cell
                            key={cellIndex}
                            className="whitespace-nowrap break-keep"
                          >
                            <div className="py-2">{cell}</div>
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            </div>
          )}

          <div className="mt-auto space-y-4">
            <Input type="file" onChange={handleFileUpload} />

            <Button
              className="w-full"
              disabled={isLoading}
              onClick={handleAddStudents}
            >
              {isLoading ? (
                <>Importando lista de estudantes...</>
              ) : (
                'Adicionar estudantes'
              )}
            </Button>

            <Dialog.Close asChild ref={dialogCloseRef}>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Cancelar
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
