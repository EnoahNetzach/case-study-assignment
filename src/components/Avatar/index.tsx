import './Avatar.css'

interface AvatarProps {
  alt?: string
  src: string
}

export default function Avatar({ alt, src }: AvatarProps) {
  return <img alt={alt} className="avatar" src={src} />
}
