import { EditorConfig } from 'grapesjs'

export const styles = ['https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css']

const escapeName = (name: string): string => {
  return `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
}

export const editorConfig: EditorConfig = {
  container: '#page-editor',
  storageManager: {
    type: 'vega',
    autoload: false
  },
  height: '100%',
  plugins: ['grapesjs-preset-webpage', 'gjs-blocks-basic'],
  canvas: {
    styles
  },
  selectorManager: {
    escapeName
  }
}
