import React from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  IconButton,
  Link,
  Toolbar,
  Tooltip
} from '@mui/material'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'

const AdminHeader: React.FC = () => {
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)
  const sess = useSession()

  return (
    <>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <NextLink href="/admin" passHref>
            <Link sx={{ color: '#fff' }} variant="h6" underline="none">
              Team Vega{' '}
              <Chip
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  cursor: 'pointer'
                }}
                variant="outlined"
                label="Admin"
              />
            </Link>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={sess.data?.user.name || ''}>
            <IconButton
              onClick={() => setAccountMenuOpen(true)}
              size="small"
              sx={{ ml: 2 }}
            >
              <Avatar
                src={sess.data?.user.image || ''}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AdminHeader
