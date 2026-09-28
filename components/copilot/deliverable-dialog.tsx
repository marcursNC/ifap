'use client'

import { Copy, Download, FileCheck2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { deliverableToMarkdown, type Deliverable } from '@/lib/copilot/deliverables'
import { ResponseContent } from './response-content'

export function DeliverableDialog({
  deliverable,
  onOpenChange,
}: {
  deliverable: Deliverable | null
  onOpenChange: (open: boolean) => void
}) {
  async function handleCopy() {
    if (!deliverable) return
    await navigator.clipboard.writeText(deliverableToMarkdown(deliverable))
    toast.success('Livrable copié dans le presse-papiers')
  }

  function handleDownload() {
    if (!deliverable) return
    const blob = new Blob([deliverableToMarkdown(deliverable)], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${deliverable.kind}.md`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Livrable téléchargé')
  }

  return (
    <Dialog open={deliverable !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-2xl">
        {deliverable && (
          <>
            <DialogHeader className="border-b p-5">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-copilot">
                <FileCheck2 className="size-4" aria-hidden="true" />
                {deliverable.label} · Brouillon
              </div>
              <DialogTitle className="text-pretty">{deliverable.title}</DialogTitle>
              <DialogDescription>
                Document généré à partir de la réponse. Complétez les champs « À préciser » et vérifiez le contenu avant diffusion.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-5">
              <dl className="mb-6 grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border p-4 sm:grid-cols-2">
                {deliverable.fields.map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-muted-foreground">{key}</dt>
                    <dd className="text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <ResponseContent
                response={{ summary: '', sections: deliverable.sections, recommendations: [], nextActions: [] }}
                revealLimit={null}
              />
            </div>

            <DialogFooter className="m-0 flex-row justify-end gap-2 rounded-b-xl border-t p-4">
              <Button variant="outline" onClick={handleCopy}>
                <Copy data-icon="inline-start" />
                Copier
              </Button>
              <Button onClick={handleDownload}>
                <Download data-icon="inline-start" />
                Télécharger (.md)
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
