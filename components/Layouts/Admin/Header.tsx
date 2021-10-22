import React from 'react'
import { AppBar, Chip, Link, Toolbar } from '@mui/material'
import NextLink from 'next/link'

const AdminHeader: React.FC = () => {
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
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AdminHeader
