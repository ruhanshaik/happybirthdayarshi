import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: 'pink' | 'gold' | 'cocoa' | 'lavender' | 'ghost'
  icon?: ReactNode
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  pulse?: boolean
}

const VARIANT: Record<NonNullable<Props['variant']>, string> = {
  pink: '',
  gold: 'btn-gold',
  cocoa: 'btn-cocoa',
  lavender: 'btn-lav',
  ghost: 'btn-ghost',
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'pink',
  icon,
  disabled,
  className = '',
  type = 'button',
  ariaLabel,
  pulse = false,
}: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      animate={pulse && !disabled ? { y: [0, -4, 0] } : undefined}
      transition={pulse ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      whileHover={disabled ? undefined : { y: -2, scale: 1.02 }}
      className={`btn-pill ${VARIANT[variant]} ${pulse ? 'anim-glow' : ''} ${className}`}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </motion.button>
  )
}
