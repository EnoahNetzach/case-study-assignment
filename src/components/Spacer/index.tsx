import SpaceToken from '../../designTokens/space'

interface SpacerProps {
  direction?: 'horizontal' | 'vertical'
  spaceToken: SpaceToken
}

export default function Spacer({ direction = 'horizontal', spaceToken }: SpacerProps) {
  return (
    <span
      style={{
        marginLeft: direction === 'horizontal' ? spaceToken : undefined,
        marginTop: direction === 'vertical' ? spaceToken : undefined,
      }}
    />
  )
}
