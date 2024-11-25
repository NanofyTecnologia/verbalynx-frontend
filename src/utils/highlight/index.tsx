import { normalize } from '@/utils/normalize'
import { Fragment } from 'react'

interface HighlightProps {
  text: string
  search: string
}

export function Highlight({ text, search }: HighlightProps) {
  if (!search.length) return <>{text}</>

  const normalizedText = normalize(text)
  const normalizedSearch = normalize(search)

  if (!normalizedText.includes(normalizedSearch)) return <>{text}</>

  const split = normalizedText.split(normalizedSearch)
  let cursor = 0

  return (
    <>
      {split.map((part, index) => {
        const fragment = text.substring(cursor, cursor + part.length)
        cursor += part.length

        const highlighted = text.substring(
          cursor,
          cursor + normalizedSearch.length,
        )

        cursor += normalizedSearch.length

        return (
          <Fragment key={index}>
            {fragment}
            {index < split.length - 1 && (
              <span className="rounded-md bg-[#8ABF3B]/50">{highlighted}</span>
            )}
          </Fragment>
        )
      })}
    </>
  )
}
