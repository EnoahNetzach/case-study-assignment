import Typography from '../Typography'
import TypographyToken from '../../designTokens/typography'
import { useUser } from '../../hooks/useUser'

export default function ProfileBadge() {
  const user = useUser()

  return (
    <div className="profile-badge">
      <img alt={user?.username} src={user?.profile} />

      <div>
        <Typography className="profile-badge_text" textToken={TypographyToken.textStyleTextLabelsGrandeBold}>
          {user ? `${user.firstName} (${user.username})` : false}
        </Typography>
      </div>
    </div>
  )
}
