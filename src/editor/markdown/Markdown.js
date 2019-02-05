import React from 'react'
import MarkdownRender from 'react-markdown'
import { InlineMath, BlockMath } from 'react-katex'

import RemarkMathPlugin from 'remark-math'
import CodeBlock from './CodeBlock'

export default function Markdown (props) {
  return <MarkdownRender source={props.source}
                         plugins={[RemarkMathPlugin]}
                         renderers={{
                           code: CodeBlock,
                           inlineMath: props =>
                             <InlineMath math={props.value}/>,
                           math: props =>
                             <BlockMath math={props.value}/>
                         }}
  />
}

