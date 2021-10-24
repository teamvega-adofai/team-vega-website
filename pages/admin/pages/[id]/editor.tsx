import React from 'react'
import { requireAdmin } from '../../../../utils/auth'
import { Page as PageType } from '@prisma/client'
import { Page } from '../../../../layout'
import { Box } from '@mui/material'
import prisma from '../../../../utils/prisma'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const PageEditor = dynamic(() => import('../../../../components/PageEditor'), {
  ssr: false
})

type Props = {
  page: PageType
}

const Editor: Page<Props> = ({ page }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Head>
        <title>Page Editor</title>
      </Head>
      <PageEditor data={page.data} id={page.id} />
    </Box>
  )
}

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

export default Editor
