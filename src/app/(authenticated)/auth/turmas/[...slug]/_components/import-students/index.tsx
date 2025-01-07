import * as XLXS from 'xlsx'
import { ChangeEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function ImportStudents() {
  const [data, setData] = useState<string[][]>([])

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

  console.log(data)

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button className="w-full">Importar lista de alunos (XLSX)</Button>
        </Dialog.Trigger>

        <Dialog.Content className="flex h-full flex-col">
          <Dialog.Header>
            <Dialog.Title>Importar lista de alunos</Dialog.Title>
            <Dialog.Description>
              Selecione um arquivo XLSX para importar a lista de alunos para
              esta turma.
            </Dialog.Description>
          </Dialog.Header>

          <table>
            <thead>
              {data[0] && (
                <tr>
                  {data[0].map((header: string, index: number) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-auto">
            <Input type="file" onChange={handleFileUpload} />
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
