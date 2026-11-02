import AnimatedTeddyBear from './AnimatedTeddyBear'
import { GiftBox, Heart, Moon, Sparkle } from './Decor'

/** Small illustrations for the scrapbook cards. */
export function ChocolateArt() {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" aria-hidden="true">
      <rect x="0" y="0" width="120" height="100" rx="10" fill="#F6E1D3" />
      <g transform="rotate(-8 60 50)">
        <rect x="26" y="26" width="68" height="48" rx="6" fill="#6B4338" />
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={30 + c * 16} y={30 + r * 14} width="13" height="11" rx="3" fill="#7F5246" />))}
        <rect x="26" y="26" width="68" height="14" rx="6" fill="#fff" opacity=".1" />
      </g>
      <path d="M44 20c-3-5 3-7 3-12M60 20c-3-5 3-7 3-12M76 20c-3-5 3-7 3-12" stroke="#E8A6B8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g transform="translate(88 6) rotate(12)"><Heart size={16} color="#E56B91" /></g>
      <circle cx="18" cy="82" r="9" fill="#59413C" />
      <circle cx="104" cy="80" r="8" fill="#59413C" />
      <circle cx="15" cy="79" r="2.500" fill="#fff" opacity=".4" />
    </svg>
  )
}

export function ParkArt() {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" aria-hidden="true">
      <rect width="120" height="100" rx="10" fill="#DDEFE0" />
      <ellipse cx="60" cy="104" rx="90" ry="28" fill="#A9CF9B" />
      <rect x="16" y="46" width="7" height="34" rx="2" fill="#8D6A4B" />
      <circle cx="19" cy="38" r="17" fill="#8DB377" />
      <circle cx="8" cy="48" r="11" fill="#9BBF84" />
      <circle cx="31" cy="46" r="11" fill="#7FA36B" />
      <rect x="48" y="66" width="52" height="7" rx="3" fill="#B07B52" />
      <rect x="48" y="52" width="52" height="5" rx="2" fill="#B07B52" />
      <rect x="52" y="73" width="5" height="13" fill="#8A5E3B" />
      <rect x="91" y="73" width="5" height="13" fill="#8A5E3B" />
      <circle cx="62" cy="58" r="8" fill="#E9A957" />
      <circle cx="84" cy="58" r="8" fill="#F6C57D" />
      <circle cx="90" cy="22" r="5" fill="#F4B7C8" />
      <path d="M90 22l8-5m-8 5l8 5" stroke="#F4B7C8" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function DreamArt() {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" aria-hidden="true">
      <rect width="120" height="100" rx="10" fill="#4B3F7A" />
      <rect y="70" width="120" height="30" rx="0" fill="#D9829B" />
      <g transform="translate(70 4)">
        <Moon size={36} />
      </g>
      <g transform="translate(14 14)"><Sparkle size={12} /></g>
      <g transform="translate(46 28)"><Sparkle size={8} color="#F4B7C8" /></g>
      <g transform="translate(22 48)"><GiftBox size={34} /></g>
      <g transform="translate(60 52)"><GiftBox size={28} color="#D8C5F2" ribbon="#F7D98B" /></g>
      <g transform="translate(88 56)"><AnimatedTeddyBear hat still label="" svgProps={{ width: 28, height: 35 }} /></g>
    </svg>
  )
}
