import React from 'react'
import { Page } from '../../../layout'
import { adminLayout } from '../../../components/Layouts/Admin'
import { Page as PageType } from '@prisma/client'
import { requireAdmin } from '../../../utils/auth'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Add, Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { useRefresh } from '../../../utils/refresh'
import prisma from '../../../utils/prisma'

type Props = { pages: PageType[] }

const PageList: Page<Props> = ({ pages }) => {
  const [refreshing, refresh] = useRefresh()

  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)

  const [creating, setCreating] = React.useState(false)

  const [createError, setCreateError] = React.useState('')

  const [createTitle, setCreateTitle] = React.useState('')

  const [createSlug, setCreateSlug] = React.useState('')

  const [createValidationErrors, setCreateValidationErrors] =
    React.useState<any>({})

  return (
    <div>
      <Dialog open={createDialogOpen}>
        <DialogTitle>페이지 추가하기</DialogTitle>
        <DialogContent>
          {createError && <Alert severity="error">{createError}</Alert>}
          <TextField
            required
            autoFocus
            fullWidth
            label="타이틀"
            variant="standard"
            sx={{ mt: 1 }}
            value={createTitle}
            onChange={(e) => {
              if (createValidationErrors.title) {
                setCreateValidationErrors({
                  ...createValidationErrors,
                  title: ''
                })
              }
              setCreateTitle(e.target.value)
            }}
            disabled={creating}
            error={!!createValidationErrors.title}
            helperText={createValidationErrors.title}
          />
          <TextField
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">/</InputAdornment>
              )
            }}
            disabled={creating}
            fullWidth
            value={createSlug}
            onChange={(e) => {
              if (createValidationErrors.slug) {
                setCreateValidationErrors({
                  ...createValidationErrors,
                  slug: ''
                })
              }
              setCreateSlug(e.target.value)
            }}
            label="주소"
            variant="standard"
            sx={{ mt: 1 }}
            error={!!createValidationErrors.slug}
            helperText={createValidationErrors.slug}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            disabled={creating}
            onClick={() => setCreateDialogOpen(false)}
          >
            취소
          </Button>
          <LoadingButton
            loading={creating}
            onClick={() => {
              setCreating(true)
              setCreateError('')
              setCreateValidationErrors({})
              try {
                let validationErrors: any = {}

                let validate = false

                if (!createTitle) {
                  validationErrors.title = '필수 필드입니다.'
                  validate = true
                }
                if (!createSlug) {
                  validationErrors.slug = '필수 필드입니다.'
                  validate = true
                }

                if (validate) {
                  setCreateValidationErrors(validationErrors)
                  setCreating(false)
                  return
                }

                setCreateError('Not implemented.')

                setCreating(false)
              } catch (e: any) {
                setCreateError(`${e}`)
                setCreating(false)
              }
            }}
          >
            추가하기
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          페이지
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
            disabled={refreshing}
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
          >
            추가하기
          </Button>
        </Stack>
      </Box>
      <List sx={{ border: '1px solid #0000000f', padding: 0 }}>
        {pages.map((x: PageType, i) => (
          <Link
            href="/admin/pages/[id]"
            passHref
            key={i}
            as={`/admin/pages/${x.id}`}
          >
            <ListItem
              key={i}
              component="a"
              button
              sx={{
                borderBottom:
                  i === pages.length - 1 ? 'none' : '1px solid #0000000f'
              }}
            >
              <ListItemText primary={x.title} secondary={x.slug} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
}

PageList.getLayout = adminLayout

export const getServerSideProps = requireAdmin<Props>(async () => {
  return {
    props: {
      pages: await prisma.page.findMany()
    }
  }
})

export default PageList
