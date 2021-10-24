import { Editor } from 'grapesjs'
import getIcons from './icons'
import getBlocks from './blocks'
import { loadTailwindBlocks } from './tailwind'

export function loadBlocks(editor: Editor) {
  loadTailwindBlocks(editor)
}
