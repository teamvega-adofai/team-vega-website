import React from 'react'
import { Page } from '../../../../layout'
import { adminLayout } from '../../../../components/Layouts/Admin'
import { requireAdmin } from '../../../../utils/auth'
import { Page as PageType } from '@prisma/client'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Delete, Edit, Refresh } from '@mui/icons-material'
import { useRefresh } from '../../../../utils/refresh'
import Link from 'next/link'
import prisma from '../../../../utils/prisma'

type Props = {
  page: PageType
}

const PageEdit: Page<Props> = ({ page }) => {
  const [refreshing, refresh] = useRefresh()
  const [deleteDialog, setDeleteDialog] = React.useState(false)

  return (
    <div>
      <Dialog open={deleteDialog}>
        <DialogTitle>페이지 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            페이지를 삭제할까요? 삭제한 페이지는 복구 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDeleteDialog(false)}>
            취소
          </Button>
          <Button color="error">삭제</Button>
        </DialogActions>
      </Dialog>
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
            onClick={() => setDeleteDialog(true)}
            startIcon={<Delete />}
            variant="outlined"
            color="error"
            disabled={refreshing}
          >
            삭제하기
          </Button>
        </Stack>
      </Box>
      <Link
        passHref
        href={'/admin/pages/[id]/editor'}
        as={`/admin/pages/${page.id}/editor`}
      >
        <Button variant="outlined" fullWidth startIcon={<Edit />}>
          수정하기
        </Button>
      </Link>
    </div>
  )
}

PageEdit.getLayout = adminLayout

export const getServerSideProps = requireAdmin<Props>(async (ctx) => {
  const id = ctx.query.id as string

  const page = await prisma.page.findUnique({
    where: {
      id
    }
  })

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      page
    }
  }
})

export default PageEdit
