import { motion } from 'framer-motion'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import { Flower } from '../components/Decor'
import FallingPetals from '../components/FallingPetals'
import MemoryRoomShell from '../components/MemoryRoomShell'
import { MEMORY_COPY } from '../data/birthdayMessages'

function Butterfly({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="anim-flutter" style={{ ['--d' as string]: '7s', animationDelay: `${delay}s` }}>
        <motion.g animate={{ scaleX: [1, 0.35, 1] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <ellipse cx="-5" cy="-3" rx="6" ry="8" fill={color} />
          <ellipse cx="5" cy="-3" rx="6" ry="8" fill={color} />
          <ellipse cx="-4" cy="5" rx="4" ry="5" fill={color} opacity=".8" />
          <ellipse cx="4" cy="5" rx="4" ry="5" fill={color} opacity=".8" />
        </motion.g>
        <rect x="-1" y="-8" width="2" height="16" rx="1" fill="#59413C" />
      </g>
    </g>
  )
}

export default function ParkRoom({ onBack }: { onBack: () => void }) {
  const c = MEMORY_COPY.rooms.park
  return (
    <MemoryRoomShell
      title={c.title}
      message={c.message}
      script="a calm little afternoon"
      background="linear-gradient(180deg,#F6F0DF 0%, #E4F0DC 55%, #CFE3C4 100%)"
      ambient={<FallingPetals kind="leaf" count={12} seed={72} />}
      onBack={onBack}
    >
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Two teddy bears sitting together on a park bench, with butterflies and flowers">
        <defs>
          <linearGradient id="parkSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#CFE8F6" />
            <stop offset="1" stopColor="#FBF1DA" />
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#parkSky)" />
        <circle cx="262" cy="44" r="22" fill="#FFF0C9" />
        <circle cx="262" cy="44" r="32" fill="#FFF0C9" opacity=".35" />
        <ellipse cx="80" cy="190" rx="170" ry="60" fill="#B9D8A6" />
        <ellipse cx="270" cy="200" rx="150" ry="50" fill="#A9CF9B" />
        {/* tree */}
        <rect x="30" y="92" width="12" height="90" rx="4" fill="#8D6A4B" />
        <g className="anim-sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          <circle cx="36" cy="76" r="38" fill="#8DB377" />
          <circle cx="12" cy="96" r="24" fill="#9BBF84" />
          <circle cx="62" cy="96" r="25" fill="#7FA36B" />
          <circle cx="40" cy="58" r="12" fill="#B7D4A0" opacity=".8" />
        </g>
        <g transform="translate(250 112)">
          <rect x="-5" y="0" width="10" height="70" fill="#8D6A4B" />
          <circle cx="0" cy="-6" r="26" fill="#9BBF84" />
          <circle cx="-14" cy="12" r="16" fill="#8DB377" />
          <circle cx="16" cy="10" r="16" fill="#7FA36B" />
        </g>
        {/* bench */}
        <rect x="98" y="132" width="126" height="9" rx="4" fill="#B07B52" />
        <rect x="98" y="148" width="126" height="9" rx="4" fill="#B07B52" />
        <rect x="108" y="170" width="9" height="30" fill="#8A5E3B" />
        <rect x="206" y="170" width="9" height="30" fill="#8A5E3B" />
        <rect x="104" y="124" width="8" height="46" rx="3" fill="#9A6842" />
        <rect x="210" y="124" width="8" height="46" rx="3" fill="#9A6842" />
        <g transform="translate(96 62)"><AnimatedTeddyBear pose="idle" label="A teddy bear on the bench" svgProps={{ width: 76, height: 94 }} /></g>
        <g transform="translate(150 62)"><AnimatedTeddyBear pose="wave" hat hatColors={['#C9B3EE', '#F7D98B']} label="A teddy bear waving hello from the bench" svgProps={{ width: 76, height: 94 }} /></g>
        <rect x="98" y="158" width="126" height="9" rx="4" fill="#B07B52" />
        {/* flowers in the grass */}
        {[[24, 205], [58, 214], [250, 212], [286, 204], [196, 218], [136, 220]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x - 11} ${y - 22})`}>
            <rect x="10" y="16" width="2" height="12" fill="#7FA36B" />
            <Flower size={22} color={['#F4B7C8', '#D8C5F2', '#FBE3A8'][i % 3]} className="anim-tilt" />
          </g>
        ))}
        <Butterfly x={140} y={60} color="#F4B7C8" delay={0} />
        <Butterfly x={200} y={90} color="#D8C5F2" delay={-3} />
        <Butterfly x={60} y={150} color="#F7D98B" delay={-5} />
      </svg>
    </MemoryRoomShell>
  )
}
