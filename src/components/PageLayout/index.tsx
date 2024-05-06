import { type PropsWithChildren, ReactNode } from 'react'
import SpaceToken from '../../designTokens/space'
import Grid from '../Grid'
import './PageLayout.css'
import Navigation from './Navigation'
import ProfileBadge from './ProfileBadge'

interface PageLayoutProps extends PropsWithChildren {
  header?: ReactNode | undefined
}

export default function PageLayout({ children, header }: PageLayoutProps) {
  return (
    <Grid
      areas={['side head', 'side main'] as const}
      cols={`${SpaceToken.space1500} 1fr`}
      rows={`minmax(${SpaceToken.space400}, ${SpaceToken.space600}) 1fr`}
      elements={[
        {
          area: 'side',
          className: 'page-layout_side',
          children: (
            <>
              <ProfileBadge />
              <Navigation
                elements={[
                  { current: true, icon: 'icon-dashboard', label: 'Dashboard' },
                  { icon: 'icon-transactions', label: 'Transactions' },
                  { icon: 'icon-invoices', label: 'Invoices' },
                  { icon: 'icon-incoming-bills', label: 'Incoming bills' },
                  { icon: 'icon-expenses', label: 'Expenses', expandable: true },
                  { icon: 'icon-accounting', label: 'Accounting' },
                  { icon: 'icon-team', label: 'Team' },
                  { icon: 'icon-other', label: 'Other', expandable: true },
                  { icon: 'icon-settings', label: 'Settings', expandable: true },
                ]}
              />
            </>
          ),
        },
        {
          area: 'head',
          children: <header className="page-layout_header">{header}</header>,
        },
        {
          area: 'main',
          children: <main className="page-layout_main">{children}</main>,
        },
      ]}
    />
  )
}
