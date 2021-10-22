import React from 'react'
import { Page } from '../../../../layout'
import { adminLayout } from '../../../../components/Layouts/Admin'
import { requireAdmin } from '../../../../utils/auth'
import { Page as PageType } from '@prisma/client'
import { Box, Button, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Delete, Refresh } from '@mui/icons-material'
import { useRefresh } from '../../../../utils/refresh'

type Props = {
  page: PageType
}

const PageEdit: Page<Props> = ({ page }) => {
  const [refreshing, refresh] = useRefresh()

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          페이지 - {page.title}
        </Typography>

        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            loading={refreshing}
            startIcon={<Refresh />}
            onClick={() => refresh()}
          >
            새로고침
          </LoadingButton>
          <Button
            startIcon={<Delete />}
            variant="outlined"
            color="error"
            disabled={refreshing}
          >
            삭제하기
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

PageEdit.getLayout = adminLayout

export const getServerSideProps = requireAdmin<Props>(async () => {
  return {
    props: {
      page: {
        data: [],
        id: '12341234',
        slug: '/test',
        title: 'Test'
      }
    }
  }
})

export default PageEdit
