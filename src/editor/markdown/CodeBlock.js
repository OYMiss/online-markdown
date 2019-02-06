import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import {githubGist} from 'react-syntax-highlighter/dist/styles/hljs';

export default function CodeBlock(props) {
  if (props.language && props.value) {
    return (
      <div>
        <SyntaxHighlighter style={githubGist} value={props.language}>
          {props.value}
        </SyntaxHighlighter>
      </div>
    );
  }
  return <code />;
}
