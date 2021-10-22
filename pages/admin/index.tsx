import { Page } from '../../layout'
import { adminLayout } from '../../components/Layouts/Admin'
import { requireAdmin } from '../../utils/auth'
import prisma from '../../utils/prisma'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { Person } from '@mui/icons-material'

const Admin: Page<{
  userCount: number
  sessionCount: number
  accountCount: number
}> = ({ userCount, sessionCount, accountCount }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              유저 수
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>{userCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              계정 개수(유저에 소속됨)
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>{accountCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              세션 개수
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>{sessionCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

Admin.getLayout = adminLayout

export const getServerSideProps = requireAdmin(async (ctx) => {
  const userCount = await prisma.user.count()
  const sessionCount = await prisma.session.count()
  const accountCount = await prisma.account.count()

  return {
    props: {
      userCount,
      sessionCount,
      accountCount
    }
  }
})

export default Admin
