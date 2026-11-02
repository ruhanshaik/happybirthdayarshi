import { motion } from 'framer-motion'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import { Heart } from '../components/Decor'
import FloatingHearts from '../components/FloatingHearts'
import MemoryRoomShell from '../components/MemoryRoomShell'
import { MEMORY_COPY } from '../data/birthdayMessages'

export default function ChocolateRoom({ onBack }: { onBack: () => void }) {
  const c = MEMORY_COPY.rooms.chocolate
  return (
    <MemoryRoomShell
      title={c.title}
      message={c.message}
      script="a sweet little memory"
      background="linear-gradient(180deg,#F8E6DA 0%, #F2CDBE 60%, #E7B5A6 100%)"
      ambient={<FloatingHearts count={10} seed={61} colors={['#8B5A4C', '#F4B7C8', '#D9829B']} />}
      buttonVariant="cocoa"
      onBack={onBack}
    >
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Two teddy bears sharing a chocolate bar at a cosy dessert table">
        <defs>
          <linearGradient id="chocWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7A5148" />
            <stop offset="1" stopColor="#59413C" />
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#chocWall)" />
        {/* string lights */}
        <path d="M0 18Q80 44 160 18T320 18" stroke="#D8B574" strokeWidth="2" fill="none" />
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={20 + i * 35} cy={26 + Math.sin(i * 0.8) * 8 + 8} r="5" fill={['#F7D98B', '#F4B7C8', '#FFF0C9'][i % 3]} className="anim-twinkle" style={{ animationDelay: `${-i * 0.4}s` }} />
        ))}
        {/* window with cocoa steam */}
        <rect x="20" y="52" width="62" height="70" rx="6" fill="#3C2A28" stroke="#D8B574" strokeWidth="3" />
        <path d="M30 112h42M30 84h42" stroke="#D8B574" strokeWidth="1.500" opacity=".5" />
        <circle cx="68" cy="70" r="6" fill="#FFF0C9" opacity=".8" />

        {/* bears sitting behind the table */}
        <g transform="translate(30 40)"><AnimatedTeddyBear pose="idle" hat label="A teddy bear" svgProps={{ width: 122, height: 151 }} /></g>
        <g transform="translate(168 40)"><AnimatedTeddyBear pose="wave" label="A teddy bear waving hello" svgProps={{ width: 122, height: 151 }} /></g>

        {/* shared chocolate bar bobbing between them */}
        <motion.g animate={{ y: [0, -5, 0], rotate: [-6, 4, -6] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <g transform="translate(124 100)">
            <rect width="72" height="50" rx="6" fill="#4B2F28" stroke="#fff" strokeWidth="2" />
            {[0, 1, 2].map((r) => [0, 1, 2, 3].map((cc) => <rect key={`${r}${cc}`} x={5 + cc * 16} y={5 + r * 14} width="13" height="11" rx="3" fill="#6B4338" />))}
            <rect width="72" height="14" rx="6" fill="#fff" opacity=".1" />
          </g>
        </motion.g>
        <g transform="translate(154 76)"><Heart size={22} className="anim-bounce" /></g>

        {/* table */}
        <path d="M0 168 Q20 160 40 168 T80 168 T120 168 T160 168 T200 168 T240 168 T280 168 T320 168V240H0Z" fill="#F9D3DD" />
        <path d="M0 176H320" stroke="#fff" strokeWidth="2" strokeDasharray="8 8" opacity=".7" />
        {/* things on the table */}
        <g transform="translate(18 150)">
          <rect width="34" height="30" rx="4" fill="#C9B3EE" />
          <rect x="14" width="6" height="30" fill="#F7D98B" />
          <path d="M17 0c-8-12-18-6-10 0zM17 0c8-12 18-6 10 0z" fill="#F7D98B" />
        </g>
        <g transform="translate(250 154)">
          <rect width="32" height="26" rx="4" fill="#F4B7C8" />
          <rect x="13" width="6" height="26" fill="#fff" />
        </g>
        <ellipse cx="160" cy="196" rx="52" ry="12" fill="#fff" />
        {[-34, -14, 8, 30].map((x, i) => (
          <circle key={i} cx={160 + x} cy="188" r="9" fill={['#59413C', '#7A5148', '#4B2F28', '#6B4338'][i]} />
        ))}
        <circle cx="156" cy="184" r="2.500" fill="#fff" opacity=".35" />
        <g transform="translate(60 196)">
          <path d="M0 0h26l-3 22H3z" fill="#fff" opacity=".9" />
          <path d="M2 4h22l-2 14H4z" fill="#8B5A4C" />
        </g>
        <g transform="translate(236 192)">
          <path d="M0 0h26l-3 22H3z" fill="#fff" opacity=".9" />
          <path d="M2 4h22l-2 14H4z" fill="#8B5A4C" />
        </g>
      </svg>
    </MemoryRoomShell>
  )
}
