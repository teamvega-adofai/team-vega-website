import React from 'react'
import { requireAdmin } from '../../../../utils/auth'
import { Page as PageType } from '@prisma/client'
import { Page } from '../../../../layout'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import axios from 'axios'

const GrapesjsReact = dynamic(
  () =>
    import('grapesjs-preset-webpage')
      .then(() => import('grapesjs-react'))
      .then((mod) => mod.GrapesjsReact) as any,
  {
    ssr: false
  }
) as React.FC<any>

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
      <GrapesjsReact
        id={`editor-${page.id}`}
        height="100%"
        width="100%"
        onChange={() => {
          console.log('afd')
        }}
        onDestroy={() => {
          console.log('destroyed')
        }}
        onInit={(editor: any) => {
          editor.StorageManager.add('vega', {
            async load(keys: string[], clb: any, clbErr: any) {
              try {
                const { data } = await axios.get<Record<string, any>>(
                  `/api/admin/pages/${page.id}`
                )
                const res: Record<string, any> = {}
                keys.forEach((key) => {
                  const value = data[key]
                  if (value) {
                    res[key] = value
                  }
                })

                clb(res)
              } catch (e) {
                clbErr(e)
              }
            },
            async store(data: any, clb: any, clbErr: any) {
              try {
                await axios.post(`/api/admin/pages/${page.id}/store`, {
                  components: JSON.parse(data['gjs-components']),
                  styles: JSON.parse(data['gjs-styles'])
                })
                clb()
              } catch (e) {
                clbErr(e)
              }
            }
          })
          console.log(editor)
        }}
        plugins={['gjs-preset-website', 'gjs-blocks-basic']}
        storageManager={{
          type: 'vega',
          autoload: true
        }}
      />
    </Box>
  )
}

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

export default Editor
