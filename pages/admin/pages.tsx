import React from 'react'
import { Page } from '../../layout'
import { adminLayout } from '../../components/Layouts/Admin'

const PageList: Page = () => {
  return <div>Pages</div>
}

PageList.getLayout = adminLayout

export default PageList
