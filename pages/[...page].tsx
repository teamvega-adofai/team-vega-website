import React from 'react'
import { Page } from '../layout'
import { GetServerSideProps } from 'next'
import prisma from '../utils/prisma'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const PageContent = dynamic(() => import('../components/PageContent'), {
  ssr: false
})

const PageData: Page<{ data: any; title: string }> = ({ data, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <PageContent data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (((ctx.query.page || []) as string[])[0] === 'api') {
    return {
      notFound: true
    }
  }

  const slug = ((ctx.query.page || []) as string[]).join('/')

  const page = await prisma.page.findUnique({
    where: {
      slug
    }
  })

  if (!page)
    return {
      notFound: true
    }

  return {
    props: {
      data: page.data,
      title: page.title
    }
  }
}

export default PageData
