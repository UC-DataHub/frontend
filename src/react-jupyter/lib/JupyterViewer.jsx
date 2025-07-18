import React, { useState } from 'react';
import BlockSource from './BlockSource';
import BlockOutput from './BlockOutput';

// -1: auto, 0: hide, 1: show, 2: scroll
const DISPLAYS = ['hide', 'show', 'scroll'];

function JupyterViewer(props) {
  const {
    rawIpynb,
    language = 'python',
    showLineNumbers = true,
    mediaAlign = 'center',
    displaySource = 'auto',
    displayOutput = 'auto',
    codeBlockStyles = undefined,
  } = props;

  const [state, setState] = useState({
    clickCellIndex: -1,
  });

  return (
    <div className="w-full h-full">
      {rawIpynb['cells'].map((cell, index) => (
        <div
          key={index}
          className="p-2 box-border overflow-hidden"
          onMouseDown={() => {
            setState({ ...state, clickCellIndex: index });
          }}
        >
          {'cell_type' in cell && (
            <BlockSource
              cell={cell}
              language={language}
              highlighted={state.clickCellIndex === index}
              display={DISPLAYS.indexOf(displaySource)}
              showLineNumbers={showLineNumbers}
              codeBlockStyles={codeBlockStyles}
            />
          )}

          {'outputs' in cell && (
            <BlockOutput
              cell={cell}
              highlighted={state.clickCellIndex === index}
              display={DISPLAYS.indexOf(displayOutput)}
              mediaAlign={
                {
                  left: 'flex-start',
                  center: 'center',
                  right: 'flex-end',
                }[mediaAlign]
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default JupyterViewer;
