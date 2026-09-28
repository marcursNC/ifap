import { ArrowRight, CheckCircle2, Info } from 'lucide-react'
import { createRevealBudget } from '@/lib/copilot/format'
import type { ContentBlock, ResponseSection, StructuredResponse } from '@/lib/copilot/types'

type Reveal = ReturnType<typeof createRevealBudget>

function Block({ block, reveal }: { block: ContentBlock; reveal: Reveal }) {
  if (block.type === 'paragraph') {
    const text = reveal(block.text)
    if (text === null) return null
    return <p className="text-pretty leading-relaxed text-foreground/90">{text}</p>
  }

  if (block.type === 'callout') {
    const text = reveal(block.text)
    if (text === null) return null
    return (
      <div className="flex gap-3 rounded-lg border border-copilot/20 bg-copilot-soft px-4 py-3 text-sm leading-relaxed">
        <Info className="mt-0.5 size-4 shrink-0 text-copilot" aria-hidden="true" />
        <p className="text-pretty">{text}</p>
      </div>
    )
  }

  if (block.type === 'list') {
    const items = block.items.map((item) => reveal(item)).filter((item): item is string => item !== null)
    if (items.length === 0) return null
    const ListTag = block.ordered ? 'ol' : 'ul'
    return (
      <ListTag className={block.ordered ? 'flex list-decimal flex-col gap-1.5 pl-5' : 'flex list-disc flex-col gap-1.5 pl-5'}>
        {items.map((item, index) => (
          <li key={index} className="pl-1 leading-relaxed text-foreground/90 marker:text-muted-foreground">
            {item}
          </li>
        ))}
      </ListTag>
    )
  }

  const columns = block.columns.map((column) => reveal(column))
  if (columns[0] === null) return null
  const rows = block.rows
    .map((row) => row.map((cell) => reveal(cell)))
    .filter((row) => row[0] !== null)

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead className="bg-muted/60">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={cellIndex === 0 ? 'px-3 py-2 font-medium' : 'px-3 py-2 text-foreground/85'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Section({ section, reveal }: { section: ResponseSection; reveal: Reveal }) {
  const title = reveal(section.title)
  if (title === null) return null
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {section.blocks.map((block, index) => (
        <Block key={index} block={block} reveal={reveal} />
      ))}
    </section>
  )
}

function ItemList({
  title,
  items,
  reveal,
  icon: Icon,
}: {
  title: string
  items: string[]
  reveal: Reveal
  icon: typeof CheckCircle2
}) {
  const visible = items.map((item) => reveal(item)).filter((item): item is string => item !== null)
  if (visible.length === 0) return null
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <ul className="flex flex-col gap-2">
        {visible.map((item, index) => (
          <li key={index} className="flex gap-2.5 leading-relaxed text-foreground/90">
            <Icon className="mt-1 size-4 shrink-0 text-copilot" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ResponseContent({ response, revealLimit }: { response: StructuredResponse; revealLimit: number | null }) {
  const reveal = createRevealBudget(revealLimit ?? Number.POSITIVE_INFINITY)
  const summary = reveal(response.summary)

  return (
    <div className="flex flex-col gap-6 text-[15px]">
      {summary && (
        <div className="rounded-lg bg-muted/50 px-4 py-3.5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Synthèse</p>
          <p className="text-pretty font-medium leading-relaxed">{summary}</p>
        </div>
      )}
      {response.sections.map((section, index) => (
        <Section key={index} section={section} reveal={reveal} />
      ))}
      <ItemList title="Recommandations" items={response.recommendations} reveal={reveal} icon={CheckCircle2} />
      <ItemList title="Actions suivantes" items={response.nextActions} reveal={reveal} icon={ArrowRight} />
    </div>
  )
}
