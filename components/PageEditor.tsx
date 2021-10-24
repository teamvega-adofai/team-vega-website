import React from 'react'
import { Editor as GrapesJsEditor } from 'grapesjs'
import grapesjs from 'grapesjs'
import axios from 'axios'
import 'grapesjs-preset-webpage'
import { loadBlocks } from '../blocks'
import { editorConfig } from '../utils/config'

const PageEditor: React.FC<{ id: string; data: any }> = ({ id, data }) => {
  const [editor, setEditor] = React.useState<GrapesJsEditor | null>(null)

  React.useEffect(() => {
    if (!editor) {
      const editor = grapesjs.init(editorConfig)

      editor.StorageManager.add('vega', {
        async load(keys: string[], clb: any, clbErr: any) {
          console.log(keys)
          try {
            const { data } = await axios.get<Record<string, any>>(
              `/api/admin/pages/${id}`
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
            await axios.post(`/api/admin/pages/${id}/store`, {
              components: editor.getComponents(),
              styles: JSON.parse(data['gjs-styles'])
            })
            clb()
          } catch (e) {
            clbErr(e)
          }
        }
      })

      loadBlocks(editor)

      editor.setComponents(data.components)

      editor.setStyle(data.styles)

      setEditor(editor)
    }
  }, [])

  return <div id="page-editor" />
}

export default PageEditor
