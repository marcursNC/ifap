import type { ContentBlock, StructuredResponse } from './types'

const TIME_ZONE = 'Pacific/Noumea'

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TIME_ZONE }).format(
    new Date(value),
  )
}

export function formatRelativeDay(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: TIME_ZONE }).format(new Date(value))
}

function blockToMarkdown(block: ContentBlock): string {
  switch (block.type) {
    case 'paragraph':
      return block.text
    case 'callout':
      return `> ${block.text}`
    case 'list':
      return block.items.map((item, index) => (block.ordered ? `${index + 1}. ${item}` : `- ${item}`)).join('\n')
    case 'table': {
      const header = `| ${block.columns.join(' | ')} |`
      const divider = `| ${block.columns.map(() => '---').join(' | ')} |`
      const rows = block.rows.map((row) => `| ${row.join(' | ')} |`)
      return [header, divider, ...rows].join('\n')
    }
  }
}

export function responseToMarkdown(response: StructuredResponse) {
  const parts = [`**Synthèse** — ${response.summary}`]
  for (const section of response.sections) {
    parts.push(`## ${section.title}`, ...section.blocks.map(blockToMarkdown))
  }
  if (response.recommendations.length) {
    parts.push('## Recommandations', response.recommendations.map((item) => `- ${item}`).join('\n'))
  }
  if (response.nextActions.length) {
    parts.push('## Actions suivantes', response.nextActions.map((item, i) => `${i + 1}. ${item}`).join('\n'))
  }
  return parts.join('\n\n')
}

export { blockToMarkdown }

/**
 * Returns a function that hands out characters from a fixed budget, in render
 * order. Used to simulate token streaming over a structured response.
 */
export function createRevealBudget(limit: number) {
  let remaining = limit
  return (text: string): string | null => {
    if (remaining <= 0) return null
    const visible = text.slice(0, remaining)
    remaining -= text.length
    return visible
  }
}

export function countResponseCharacters(response: StructuredResponse) {
  let total = response.summary.length
  for (const section of response.sections) {
    total += section.title.length
    for (const block of section.blocks) {
      if (block.type === 'paragraph' || block.type === 'callout') total += block.text.length
      else if (block.type === 'list') total += block.items.reduce((sum, item) => sum + item.length, 0)
      else {
        total += block.columns.reduce((sum, column) => sum + column.length, 0)
        total += block.rows.flat().reduce((sum, cell) => sum + cell.length, 0)
      }
    }
  }
  total += response.recommendations.reduce((sum, item) => sum + item.length, 0)
  total += response.nextActions.reduce((sum, item) => sum + item.length, 0)
  return total
}
