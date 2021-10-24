import React from 'react'
import { styles } from '../utils/config'
import { gjs } from '../utils/editor'

const PageContent: React.FC<{ data: any }> = ({ data }) => {
  const { html, css } = React.useMemo(() => {
    gjs.setComponents(data.components)
    gjs.setStyle(data.style)

    const html = gjs.getHtml()

    const css = gjs.getCss()

    return { html, css }
  }, [data])

  return (
    <div>
      {styles.map((x, i) => (
        <link rel="stylesheet" href={x} key={i} />
      ))}
      <div id="page-editor" style={{ display: 'none' }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default PageContent
