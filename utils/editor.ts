import grapesjs from 'grapesjs'
import { editorConfig } from './config'

export const gjs = grapesjs.init({
  ...editorConfig,
  container: '#grapesjs-headless'
})
