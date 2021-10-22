import React from 'react'
import { Page } from '../layout'
import { GetServerSideProps } from 'next'

const PageData: Page = () => {
  return <div>Page</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}

export default PageData
