import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard, Pages } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SidebarContent: React.FC = () => {
  const router = useRouter()

  return (
    <List>
      <Link href="/admin" passHref>
        <ListItem button selected={router.pathname === '/admin'} component="a">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="대시보드" />
        </ListItem>
      </Link>
      <Link href="/admin/pages" passHref>
        <ListItem button selected={router.pathname === '/pages'} component="a">
          <ListItemIcon>
            <Pages />
          </ListItemIcon>
          <ListItemText primary="페이지" />
        </ListItem>
      </Link>
    </List>
  )
}

export default SidebarContent
