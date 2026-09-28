'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { StudioLogo, StudioNav } from './studio-nav'

function SidebarFooter() {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background/60 p-3">
      <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
        CP
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">Conseiller pédagogique</p>
        <p className="truncate text-xs text-muted-foreground">Session de démonstration</p>
      </div>
    </div>
  )
}

export function StudioShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r bg-sidebar px-4 py-5 lg:flex">
        <StudioLogo />
        <div className="mt-8 flex-1">
          <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Espace de travail</p>
          <StudioNav />
        </div>
        <SidebarFooter />
        <p className="mt-3 px-1 text-[11px] text-muted-foreground">IFAP Studio · V0.3 prototype</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/90 px-4 backdrop-blur lg:hidden">
          <StudioLogo />
          <Button variant="ghost" size="icon" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}>
            <Menu />
          </Button>
        </header>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="left" className="w-72 bg-sidebar p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Navigation principale d&apos;IFAP Studio</SheetDescription>
              <StudioLogo />
            </SheetHeader>
            <div className="flex flex-1 flex-col px-3">
              <StudioNav onNavigate={() => setMenuOpen(false)} />
            </div>
            <div className="p-4">
              <SidebarFooter />
            </div>
          </SheetContent>
        </Sheet>
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
