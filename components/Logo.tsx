import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface LogoProps {
  logoImage?: { asset: { _ref: string } }
  size?: number
}

export default function Logo({ logoImage, size = 50 }: LogoProps) {
  if (logoImage?.asset) {
    return (
      <Image
        src={urlFor(logoImage).height(100).url()}
        alt="Haeden Finance Logo"
        height={size}
        width={size * 5}
        style={{ height: size, width: 'auto', objectFit: 'contain' }}
        priority
      />
    )
  }
  // Default SVG logo
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 36, height: 36, display: 'block' }}>
      <rect width="100" height="100" fill="#000" rx="8"/>
      <path d="M50,8 L11,40 L11,88 L89,88 L89,40 Z" fill="none" stroke="#F5C200" strokeWidth="10" strokeLinejoin="miter"/>
      <line x1="20" y1="80" x2="72" y2="28" stroke="#F5C200" strokeWidth="10" strokeLinecap="butt"/>
      <line x1="72" y1="28" x2="55" y2="28" stroke="#F5C200" strokeWidth="10" strokeLinecap="square"/>
      <line x1="72" y1="28" x2="72" y2="45" stroke="#F5C200" strokeWidth="10" strokeLinecap="square"/>
    </svg>
  )
}
