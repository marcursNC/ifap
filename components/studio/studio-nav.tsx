'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Tableau de bord', icon: LayoutDashboard, badge: undefined },
  { href: '/copilot', label: 'IFAP Copilot', icon: Bot, badge: 'IA' },
]

export function StudioLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-[13px] font-semibold tracking-tight text-primary-foreground">
        IF
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight">IFAP Studio</span>
        <span className="mt-1 text-[11px] text-muted-foreground">Nouvelle-Calédonie</span>
      </span>
    </Link>
  )
}

export function StudioNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Navigation principale" className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              active && 'bg-sidebar-accent text-sidebar-accent-foreground',
            )}
          >
            <item.icon className={cn('size-4', active ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="rounded-md bg-copilot-soft px-1.5 py-0.5 text-[10px] font-semibold text-copilot">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
