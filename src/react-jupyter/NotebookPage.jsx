'use client';

import React, { useState } from 'react';
import nb_test from './nb_test.json';

import JupyterViewer from './lib/JupyterViewer';
import hljsStyles from './lib/hljsStyles';

export default function NotebookPage({ipynb = nb_test}) {
  const [state, setState] = useState({
    rawIpynb: ipynb,
    mediaAlign: 'center',
    displaySource: 'auto',
    displayOutput: 'auto',
    showLineNumbers: true,
    codeBlockStyles: undefined,
  });

  return (
    <div className="p-4">
      {/* <div className="flex flex-wrap gap-4 mb-6">
        <input
          name="rawIpynb"
          type="file"
          accept=".ipynb"
          onChange={e => {
            if (e.target.files[0]) {
              const reader = new FileReader();
              reader.readAsText(e.target.files[0], 'UTF-8');
              reader.onload = e => {
                try {
                  setState({ ...state, rawIpynb: JSON.parse(e.target.result) });
                } catch (err) {
                  alert('Invalid notebook file.');
                }
              };
              reader.onerror = e => {
                console.error('File read error:', e);
              };
            }
          }}
        />

        <Dropdown name="mediaAlign" value={state.mediaAlign} options={['left', 'center', 'right']} onChange={v => setState({ ...state, mediaAlign: v })} />
        <Dropdown name="displaySource" value={state.displaySource} options={['auto', 'hide', 'show']} onChange={v => setState({ ...state, displaySource: v })} />
        <Dropdown name="displayOutput" value={state.displayOutput} options={['auto', 'hide', 'show', 'scroll']} onChange={v => setState({ ...state, displayOutput: v })} />
        <Dropdown
          name="showLineNumbers"
          value={state.showLineNumbers ? 'show' : 'hide'}
          options={['show', 'hide']}
          onChange={v => setState({ ...state, showLineNumbers: v === 'show' })}
        />
        <Dropdown
          name="hljsStyle"
          value={state.codeBlockStyles?.hljsStyle || 'default'}
          options={['default', ...Object.keys(hljsStyles)]}
          onChange={v =>
            setState({
              ...state,
              codeBlockStyles: v === 'default' ? undefined : { hljsStyle: v },
            })
          }
        />
      </div> */}

      {state.rawIpynb && (
        <JupyterViewer
          rawIpynb={state.rawIpynb}
          mediaAlign={state.mediaAlign}
          showLineNumbers={state.showLineNumbers}
          displaySource={state.displaySource}
          displayOutput={state.displayOutput}
          codeBlockStyles={state.codeBlockStyles}
        />
      )}
    </div>
  );
}

function Dropdown({ name, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="mr-1">
        {name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
