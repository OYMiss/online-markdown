import React from 'react'

import ReactDOMServer from 'react-dom/server'
import Markdown from './markdown/Markdown'
import SimpleMDE from 'react-simplemde-editor'

export default function Editor (props) {
  const { post, onChange, getMdeInstance, customAction } = props
  return <SimpleMDE
    value={post.content}
    onChange={onChange}
    getMdeInstance={getMdeInstance}
    options={{
      autoDownloadFontAwesome: true,
      status: false,
      toolbar: ['bold', 'italic', 'strikethrough', 'quote', '|',
        'table', 'unordered-list', 'ordered-list', 'image', 'link',
        '|',
        {
          name: 'custom',
          action: customAction,
          className: 'fa fa-copy',
          title: 'Custom Button',
        },],
      spellChecker: false,
      previewRender: source =>
        ReactDOMServer.renderToString(<Markdown source={source}/>)
    }}
  />

}

