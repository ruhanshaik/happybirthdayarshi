import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import { Balloons, GiftBox, Moon, Sparkle } from '../components/Decor'
import FloatingHearts from '../components/FloatingHearts'
import MemoryRoomShell from '../components/MemoryRoomShell'
import TwinklingStars from '../components/TwinklingStars'
import { MEMORY_COPY } from '../data/birthdayMessages'

export default function DreamPlannersRoom({ onBack }: { onBack: () => void }) {
  const c = MEMORY_COPY.rooms['dream-planners']
  return (
    <MemoryRoomShell
      title={c.title}
      message={c.message}
      script="little dreams, big plans"
      tone="dark"
      paper="#FFF8F0"
      background="linear-gradient(180deg,#2E2458 0%, #5A4287 55%, #A5688F 100%)"
      ambient={
        <>
          <TwinklingStars count={50} seed={83} maxTop={80} shooting />
          <FloatingHearts count={7} seed={84} colors={['#F4B7C8', '#D8C5F2', '#F7D98B']} />
        </>
      }
      buttonVariant="lavender"
      onBack={onBack}
    >
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="A celebration table with presents under a crescent moon, with a teddy bear in a party hat">
        <defs>
          <linearGradient id="dreamSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1F1848" />
            <stop offset="1" stopColor="#7C5A9E" />
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#dreamSky)" />
        {[[30, 30, 14], [90, 56, 9], [200, 26, 12], [150, 90, 8], [286, 90, 10], [60, 100, 8]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y})`}><Sparkle size={s} className="anim-twinkle" style={{ animationDelay: `${-i * 0.5}s` }} /></g>
        ))}
        <g transform="translate(224 14)"><Moon size={72} /></g>
        <g transform="translate(262 62)"><Balloons size={44} className="anim-sway" /></g>
        {/* bunting */}
        <path d="M0 14Q80 40 160 14" stroke="#F7D98B" strokeWidth="1.500" fill="none" />
        {[14, 44, 74, 104, 134].map((x, i) => (
          <path key={x} d={`M${x} ${18 + Math.sin(i / 1.5) * 8}l14 4-8 18z`} fill={['#F4B7C8', '#F7D98B', '#D8C5F2', '#9ADBC2', '#F6A58C'][i]} />
        ))}
        {/* table */}
        <path d="M0 176 Q20 168 40 176 T80 176 T120 176 T160 176 T200 176 T240 176 T280 176 T320 176V240H0Z" fill="#E8A6C0" />
        <rect y="176" width="320" height="6" fill="#fff" opacity=".35" />
        {/* presents, cake, bear */}
        <g transform="translate(16 118)"><GiftBox size={64} /></g>
        <g transform="translate(66 134)"><GiftBox size={46} color="#D8C5F2" ribbon="#F7D98B" /></g>
        <g transform="translate(96 44)"><AnimatedTeddyBear pose="wave" hat label="A teddy bear in a party hat waving hello" svgProps={{ width: 128, height: 159 }} /></g>
        <g transform="translate(214 130)"><GiftBox size={54} color="#F7D98B" ribbon="#E56B91" /></g>
        <g transform="translate(256 148)"><GiftBox size={38} color="#9ADBC2" ribbon="#fff" /></g>
      </svg>
    </MemoryRoomShell>
  )
}
