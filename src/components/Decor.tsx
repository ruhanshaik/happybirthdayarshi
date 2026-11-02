import { useId } from 'react'
import type { CSSProperties } from 'react'

type P = { className?: string; style?: CSSProperties; color?: string; size?: number }

export function Heart({ className, style, color = '#E56B91', size = 24 }: P) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 28C5 20 2 14 2 9.5 2 5.6 5 3 8.4 3c3 0 5.6 1.8 7.6 4.6C18 4.8 20.600 3 23.600 3 27 3 30 5.600 30 9.500 30 14 27 20 16 28z" fill={color} />
      <ellipse cx="9.500" cy="9" rx="3" ry="2" fill="#fff" opacity=".45" transform="rotate(-30 9.500 9)" />
    </svg>
  )
}

export function Sparkle({ className, style, color = '#F2C46B', size = 20 }: P) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.8 6 2.600 9.400 12 12-9.400 2.600-11.200 6-12 12-.8-6-2.600-9.400-12-12C9.400 9.400 11.200 6 12 0z" fill={color} />
    </svg>
  )
}

export function Flower({ className, style, color = '#F4B7C8', size = 40 }: P) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="20" cy="9.500" rx="6.500" ry="9" fill={color} transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" fill="#F7D98B" />
      <circle cx="18.500" cy="18.500" r="1.500" fill="#fff" opacity=".6" />
    </svg>
  )
}

/** A little stem with leaves and flowers. */
export function FlowerSprig({ className, style, size = 120, tone = 'pink' }: P & { tone?: 'pink' | 'lavender' | 'mixed' }) {
  const c1 = tone === 'lavender' ? '#C9B3EE' : '#F4B7C8'
  const c2 = tone === 'pink' ? '#F9D3DD' : '#C9B3EE'
  return (
    <svg className={className} style={style} width={size} height={size * 1.2} viewBox="0 0 100 120" aria-hidden="true">
      <path d="M50 118C48 90 52 60 50 34" stroke="#7FA36B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M50 90c-14-2-22-10-24-20 12 0 22 6 24 20z" fill="#9BBF84" />
      <path d="M50 74c12-2 20-9 22-18-11 0-20 6-22 18z" fill="#8DB377" />
      <path d="M50 100C40 96 30 98 22 106c10 4 22 2 28-6z" fill="#8DB377" />
      <g transform="translate(28 14) scale(.9)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="22" cy="10" rx="7" ry="10" fill={c1} transform={`rotate(${a} 22 22)`} />
        ))}
        <circle cx="22" cy="22" r="5.500" fill="#F7D98B" />
      </g>
      <g transform="translate(6 30) scale(.55)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="22" cy="10" rx="7" ry="10" fill={c2} transform={`rotate(${a} 22 22)`} />
        ))}
        <circle cx="22" cy="22" r="5" fill="#F7D98B" />
      </g>
      <g transform="translate(60 40) scale(.5)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="22" cy="10" rx="7" ry="10" fill={c2} transform={`rotate(${a} 22 22)`} />
        ))}
        <circle cx="22" cy="22" r="5" fill="#F7D98B" />
      </g>
    </svg>
  )
}

export function Moon({ className, style, size = 80, color = '#FFF0C9' }: P) {
  const id = useId()
  return (
    <svg className={className} style={{ filter: 'drop-shadow(0 0 14px rgba(255,240,201,.7))', ...style }} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect width="100" height="100" fill="#fff" />
          <circle cx="68" cy="38" r="34" fill="#000" />
        </mask>
      </defs>
      <circle cx="46" cy="54" r="38" fill={color} mask={`url(#${id})`} />
    </svg>
  )
}

export function Balloons({ className, style, size = 150 }: P) {
  const b = [
    { x: 40, y: 50, c: '#F6A58C', rx: 28, ry: 34 },
    { x: 86, y: 38, c: '#FBE3A8', rx: 27, ry: 33 },
    { x: 26, y: 100, c: '#C9B3EE', rx: 26, ry: 32 },
    { x: 78, y: 92, c: '#F7C74B', rx: 27, ry: 33 },
    { x: 48, y: 140, c: '#9ADBC2', rx: 25, ry: 31 },
    { x: 100, y: 138, c: '#F4B7C8', rx: 26, ry: 32 },
  ]
  return (
    <svg className={className} style={style} width={size} height={size * 1.55} viewBox="0 0 130 200" aria-hidden="true">
      {b.map((o, i) => (
        <g key={i}>
          <path d={`M${o.x} ${o.y + o.ry} Q${62 + (i % 2) * 8} 175 66 196`} stroke="#E8A0B4" strokeWidth="1.400" fill="none" />
          <ellipse cx={o.x} cy={o.y} rx={o.rx} ry={o.ry} fill={o.c} />
          <ellipse cx={o.x - 8} cy={o.y - 10} rx="6" ry="10" fill="#fff" opacity=".4" transform={`rotate(-20 ${o.x - 8} ${o.y - 10})`} />
          <path d={`M${o.x - 4} ${o.y + o.ry - 1}l4 6 4-6z`} fill={o.c} />
        </g>
      ))}
      <path d="M66 190c-10-4-22 0-26 8 10 4 22 2 26-8zM66 190c10-4 22 0 26 8-10 4-22 2-26-8z" fill="#F4B7C8" />
    </svg>
  )
}

export function Bunting({ className, style }: P) {
  const flags = ['#F7C74B', '#9ADBC2', '#F9D3DD', '#C9B3EE', '#F6A58C', '#FBE3A8', '#9ADBC2', '#F9D3DD']
  return (
    <svg className={className} style={style} viewBox="0 0 400 70" preserveAspectRatio="none" width="100%" height="64" aria-hidden="true">
      <path d="M0 6 Q200 34 400 6" stroke="#B89A8A" strokeWidth="1.500" fill="none" />
      {flags.map((c, i) => {
        const x = 10 + i * 48
        const y = 8 + Math.sin((i / 7.6) * Math.PI) * 16
        return (
          <g key={i} transform={`rotate(${(i - 3.5) * 2.5} ${x + 20} ${y})`}>
            <path d={`M${x} ${y}h40l-20 44z`} fill={c} stroke="#fff" strokeWidth="1.500" strokeLinejoin="round" />
            <circle cx={x + 14} cy={y + 12} r="1.800" fill="#fff" opacity=".7" />
            <circle cx={x + 26} cy={y + 12} r="1.800" fill="#fff" opacity=".7" />
            <circle cx={x + 20} cy={y + 22} r="1.800" fill="#fff" opacity=".7" />
          </g>
        )
      })}
    </svg>
  )
}

export function GiftBox({ className, style, size = 80, color = '#F4B7C8', ribbon = '#C9B3EE' }: P & { ribbon?: string }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="10" y="32" width="60" height="42" rx="6" fill={color} />
      <rect x="6" y="22" width="68" height="16" rx="5" fill={color} />
      <rect x="6" y="22" width="68" height="16" rx="5" fill="#fff" opacity=".18" />
      <rect x="35" y="22" width="10" height="52" fill={ribbon} />
      <path d="M40 22C28 6 14 14 24 22zM40 22C52 6 66 14 56 22z" fill={ribbon} />
      <circle cx="40" cy="22" r="4.500" fill={ribbon} stroke="#fff" strokeWidth="1" opacity=".95" />
      <circle cx="22" cy="52" r="2" fill="#fff" opacity=".6" />
      <circle cx="56" cy="62" r="2" fill="#fff" opacity=".6" />
    </svg>
  )
}

export function Envelope({ className, style, size = 48 }: P) {
  return (
    <svg className={className} style={style} width={size} height={size * 0.75} viewBox="0 0 64 48" aria-hidden="true">
      <rect x="2" y="4" width="60" height="40" rx="6" fill="#F3DDBB" />
      <path d="M2 10l30 20L62 10" stroke="#D8B574" strokeWidth="2.500" fill="none" strokeLinejoin="round" />
      <path d="M2 44l22-18M62 44L40 26" stroke="#E4C894" strokeWidth="2" />
      <path d="M32 33c-6-4-8-7-8-9.500 0-2 1.500-3.500 3.500-3.500 1.800 0 3.600 1 4.500 2.800C32.900 20.800 34.700 20 36.500 20c2 0 3.500 1.500 3.500 3.500 0 2.500-2 5.500-8 9.500z" fill="#E56B91" />
    </svg>
  )
}
