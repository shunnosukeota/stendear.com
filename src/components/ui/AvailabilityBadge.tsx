'use client'

import { useEffect, useState } from 'react'
import { SITE, availabilityLabel } from '@/content/site'

/**
 * 稼働状況バッジ。
 * 「来月から受付」の表示を保つため、文言は日付から組み立てる。
 * 静的書き出しだと HTML はビルド時刻のまま固まるので、描画後に
 * 閲覧時点の日付で計算し直す。これで毎月の書き換えが要らなくなる。
 * 枠数と状態は src/content/site.ts の availability で変更できる。
 */
export default function AvailabilityBadge({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const { status } = SITE.availability
  const [label, setLabel] = useState(() => availabilityLabel())

  useEffect(() => {
    setLabel(availabilityLabel())
  }, [])

  const dot = status === 'closed' ? 'bg-muted' : status === 'limited' ? 'bg-ec' : 'bg-data'
  const skin = tone === 'dark' ? 'border-white/25 bg-white/10 text-white' : 'border-line bg-bg text-fg'
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-bold ${skin} ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-60`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      {/* ビルド時刻と閲覧時刻で月がずれることがあるため、不一致の警告は抑止する */}
      <span suppressHydrationWarning>
        <span className="sr-only">稼働状況：</span>
        {label}
      </span>
    </span>
  )
}
