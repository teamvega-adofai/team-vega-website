import React from 'react'
import { Page } from '../../../../layout'
import { adminLayout } from '../../../../components/Layouts/Admin'
import { requireAdmin } from '../../../../utils/auth'
import { Page as PageType } from '@prisma/client'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Delete, Edit, Refresh } from '@mui/icons-material'
import { useRefresh } from '../../../../utils/refresh'
import Link from 'next/link'
import prisma from '../../../../utils/prisma'
import axios from 'axios'

type Props = {
  page: PageType
}

const PageEdit: Page<Props> = ({ page }) => {
  const [refreshing, refresh] = useRefresh()
  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [deleteError, setDeleteError] = React.useState('')
  const [title, setTitle] = React.useState(page.title)
  const [slug, setSlug] = React.useState(page.slug)
  const [editing, setEditing] = React.useState(false)
  const [validationErrors, setValidationErrors] = React.useState<any>({})
  const [error, setError] = React.useState('')

  return (
    <div>
      <Dialog open={deleteDialog}>
        <DialogTitle>페이지 삭제</DialogTitle>
        <DialogContent>
          {deleteError && (
            <Alert sx={{ mb: 2 }} severity="error">
              {deleteError}
            </Alert>
          )}
          <DialogContentText>
            페이지를 삭제할까요? 삭제한 페이지는 복구 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={deleting}
            color="primary"
            onClick={() => setDeleteDialog(false)}
          >
            취소
          </Button>
          <LoadingButton
            loading={deleting}
            color="error"
            onClick={async () => {
              setDeleting(true)
              try {
                await axios.delete(`/api/admin/pages/${page.id}`)
              } catch (e: any) {
                if (e?.response?.data?.error) {
                  setDeleteError(e.response.data.error)
                } else {
                  setDeleteError(`${e}`)
                }
                setDeleting(false)
              }
            }}
          >
            삭제
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          페이지 - {page.title}
        </Typography>

        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            loading={refreshing || editing}
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
            disabled={refreshing || editing}
          >
            삭제하기
          </Button>
        </Stack>
      </Box>

      <Stack spacing={2} direction="column">
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          required
          autoFocus
          fullWidth
          label="타이틀"
          variant="standard"
          sx={{ mt: 1 }}
          value={title}
          onChange={(e) => {
            if (e.target.value) {
              setValidationErrors({
                ...validationErrors,
                title: ''
              })
            } else if (!e.target.value) {
              setValidationErrors({
                ...validationErrors,
                title: '필수 필드입니다'
              })
            }
            setTitle(e.target.value)
          }}
          disabled={refreshing || editing}
          error={!!validationErrors.title}
          helperText={validationErrors.title}
        />
        <TextField
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">/</InputAdornment>
          }}
          disabled={refreshing || editing}
          fullWidth
          value={slug}
          onChange={(e) => {
            if (e.target.value) {
              setValidationErrors({
                ...validationErrors,
                slug: ''
              })
            } else if (!e.target.value) {
              setValidationErrors({
                ...validationErrors,
                slug: '필수 필드입니다'
              })
            }
            setSlug(e.target.value)
          }}
          label="주소"
          variant="standard"
          sx={{ mt: 1 }}
          error={!!validationErrors.slug}
          helperText={validationErrors.slug}
        />
        <Stack direction="row" spacing={2}>
          <LoadingButton
            startIcon={<Delete />}
            loading={refreshing || editing}
            variant="outlined"
            fullWidth
            onClick={async () => {
              setEditing(true)

              let validationErrors: any = {}

              let validate = false

              if (!title) {
                validationErrors.title = '필수 필드입니다.'
                validate = true
              }
              if (!slug) {
                validationErrors.slug = '필수 필드입니다.'
                validate = true
              }

              if (validate) {
                setValidationErrors(validationErrors)
                setEditing(false)
                return
              }

              try {
                await axios.patch(`/api/admin/pages/${page.id}`, {
                  title,
                  slug
                })

                setEditing(false)

                return refresh()
              } catch (e: any) {
                if (e?.response?.data?.error) {
                  setError(e.response.data.error)
                } else {
                  setError(`${e}`)
                }
                setEditing(false)
              }
            }}
          >
            저장하기
          </LoadingButton>
          <Link
            passHref
            href={'/admin/pages/[id]/editor'}
            as={`/admin/pages/${page.id}/editor`}
          >
            <Button
              disabled={refreshing || editing}
              variant="outlined"
              fullWidth
              startIcon={<Edit />}
            >
              페이지 편집하기
            </Button>
          </Link>
        </Stack>
      </Stack>
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
