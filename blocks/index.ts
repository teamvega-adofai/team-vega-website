import { Editor } from 'grapesjs'
import getIcons from './icons'
import ReactDOMServer from 'react-dom/server'

const icons = getIcons()

export function loadBlocks(editor: Editor) {
  console.log(
    Object.fromEntries(
      Object.entries(icons).map(([key, value]) => {
        return [
          key,
          Object.fromEntries(
            Object.entries(value).map(([key2, value2]) => {
              return [key2, ReactDOMServer.renderToString(value2)]
            })
          )
        ]
      })
    )
  )
}
