import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import RemarkGFM from "remark-gfm";
import RemarkMath from "remark-math";
import RehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

import hljsStyles from "./hljsStyles";

function BlockSource(props) {
  const metadata = props.cell['metadata'];
  const source = props.cell['source'];
  const type = props.cell['cell_type'];

  const [state, setState] = useState({
    prevDisplay: 1,
    display: 1,
    contentHeight: 0,
  });

  if (props.display !== state.prevDisplay) {
    let newDisplay = props.display;
    if (newDisplay === -1 && metadata?.jupyter?.source_hidden) {
      newDisplay = 0;
    }

    setState({ ...state, prevDisplay: props.display, display: newDisplay });
  }

  let htmlContent;
  let executionCount;

  if (type === 'code') {
    executionCount = props.cell['execution_count'];

    const {
      hljsStyle,
      lineNumberStyle,
      lineNumberContainerStyle,
      codeContainerStyle,
    } = props.codeBlockStyles || {};

    htmlContent = (
      <div className="flex w-full">
        {props.showLineNumbers && (
          <SyntaxHighlighter
            language={props.language}
            style={hljsStyle ? hljsStyles[hljsStyle] : hljsStyles.vs}
            codeTagProps={{ style: { fontFamily: "Menlo, Consolas, 'DejaVu Sans Mono', monospace", fontSize: "13px" } }}
            customStyle={hljsStyle ? lineNumberContainerStyle : {
              width: "37px",
              margin: "0",
              padding: "5px 0",
              boxSizing: "border-box",
              background: "#EEEEEE",
              border: "1px solid #E0E0E0",
              overflow: "hidden",
            }}
            showLineNumbers
            lineNumberStyle={hljsStyle ? lineNumberStyle : {
              width: "37px",
              padding: "0 8px",
              boxSizing: "border-box",
              color: "#999999",
            }}
          >
            {!source ? null : source.map((item, index) => index === 0 ? ' ' : '\n').join('')}
          </SyntaxHighlighter>
        )}

        <div className="flex-1">
          <SyntaxHighlighter
            language={props.language}
            style={hljsStyle ? hljsStyles[hljsStyle] : hljsStyles.vs}
            codeTagProps={{ style: { fontFamily: "Menlo, Consolas, 'DejaVu Sans Mono', monospace", fontSize: "13px" } }}
            customStyle={hljsStyle ? codeContainerStyle : {
              margin: "0",
              padding: "5px 4px",
              boxSizing: "border-box",
              background: "#F5F5F5",
              border: "1px solid #E0E0E0",
            }}
          >
            {!source ? null : source.join('')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  } else if (type === 'markdown') {
    const re = /\n?\s*\$\$\s*\n?/g;
    const newSource = !source ? '' : source.join('').replaceAll(re, "\n$$$\n");

    htmlContent = (
      <div className="px-5 py-2 text-sm font-sans prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[RemarkGFM, RemarkMath]}
          rehypePlugins={[RehypeKatex]}
        >
          {newSource}
        </ReactMarkdown>
      </div>
    );
  } else {
    htmlContent = <div>{`Cell Type ${type} not supported...`}</div>;
  }

  return (
    <div className="w-full">
      <div
        className={`w-2 mr-2 rounded-sm cursor-pointer ${props.highlighted ? 'bg-blue-500 hover:bg-blue-700' : 'bg-transparent hover:bg-blue-300'}`}
        onClick={() => {
          setState({ ...state, display: (state.display + 1) % 2 });
        }}
      />
      {state.display === 0 ? (
        <div className="min-h-[20px] w-full" />
      ) : (
        <div className="flex w-full">
          {/* <pre className="text-right w-16 pt-1 text-blue-600 text-sm pr-1">
            {executionCount ? `[${executionCount}]: ` : null}
          </pre> */}
          {htmlContent}
        </div>
      )}
    </div>
  );
}

export default BlockSource;
