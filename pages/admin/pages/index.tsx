import React from 'react'
import { Page } from '../../../layout'
import { adminLayout } from '../../../components/Layouts/Admin'
import { Page as PageType } from '@prisma/client'
import { requireAdmin } from '../../../utils/auth'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { Add, Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { useRefresh } from '../../../utils/refresh'

type Props = { pages: PageType[] }

const PageList: Page<Props> = ({ pages }) => {
  const [refreshing, refresh] = useRefresh()

  return (
    <div>
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
          <Button disabled={refreshing} variant="outlined" startIcon={<Add />}>
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
      pages: new Array(30).fill({
        data: [],
        id: '12341234',
        slug: '/test',
        title: 'Test'
      })
    }
  }
})

export default PageList
