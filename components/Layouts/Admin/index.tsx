import React, { useState } from 'react'
import { Box, Container, Toolbar } from '@mui/material'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'

const AdminLayout: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <AdminHeader />
      <Box sx={{ display: 'flex' }}>
        <AdminSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Container>
          <Toolbar />
          <Box sx={{ my: 2 }}>{children}</Box>
        </Container>
      </Box>
    </div>
  )
}

export default AdminLayout

export const adminLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
)

export const ADMIN_DRAWER_WIDTH = 240
