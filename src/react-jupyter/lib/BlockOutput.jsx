import React, { useCallback, useState } from "react";
import Ansi from "ansi-to-react";

function BlockOutput(props) {
  const metadata = props.cell['metadata'];
  const outputs = props.cell['outputs'];

  const [state, setState] = useState({
    highlighted: false,
    prevDisplay: 1,
    display: 1,
    contentHeight: 0,
  });

  const contentRef = useCallback((node) => {
    if (node) {
      setState((prev) => ({ ...prev, contentHeight: node.offsetHeight }));
    }
  }, []);

  if (props.display !== state.prevDisplay) {
    let newDisplay = props.display;
    if (newDisplay === -1) {
      if (metadata?.collapsed || metadata?.jupyter?.outputs_hidden) {
        newDisplay = 0;
      } else if (metadata?.scrolled) {
        newDisplay = 2;
      }
    }
    setState((prev) => ({ ...prev, prevDisplay: props.display, display: newDisplay }));
  }

  return (
    <div className="w-full">
      <div
        className={`w-2 mr-2 rounded-sm cursor-pointer ${props.highlighted ? "bg-orange-500 hover:bg-orange-700" : "bg-transparent hover:bg-orange-300"}`}
        onClick={() => {
          setState((prev) => ({ ...prev, display: (prev.display + 1) % 3 }));
        }}
      />

      {state.display === 0 ? (
        <div className="min-h-[20px] w-full" />
      ) : (
        <div
          className={`w-full ${state.display === 2 ? "overflow-y-auto max-h-[200px] resize-y shadow-inner" : ""}`}
        >
          <div ref={contentRef}>
            {!outputs ? null : outputs.map((output, index) => {
              let executionCount;
              let htmlContent;

              if ('output_type' in output) {
                const output_type = output['output_type'];
                switch (output_type) {
                  case 'stream':
                    htmlContent = (
                      <div className={`w-full p-2 whitespace-pre-wrap text-sm ${output['name'] === 'stdout' ? 'text-black' : 'text-gray-700'}`}>
                        {output['text']?.join('') ?? ''}
                      </div>
                    );
                    break;

                  case 'execute_result':
                    executionCount = output['execution_count'];
                  // fall through to display_data

                  case 'display_data': {
                    const output_data = output['data'];
                    if (output_data) {
                      if ('image/png' in output_data) {
                        const size = output['metadata']?.['image/png'];
                        htmlContent = (
                          <div className={`w-full flex py-2`} style={{ justifyContent: props.mediaAlign }}>
                            <img
                              src={`data:image/png;base64,${output_data['image/png']}`}
                              width={size?.width ?? 'auto'}
                              height={size?.height ?? 'auto'}
                              alt=""
                              className="rounded py-2"
                            />
                          </div>
                        );
                      } else if ('text/html' in output_data) {
                        htmlContent = (
                          <div
                            className={`w-full py-2 text-sm prose max-w-none`}
                            style={{ justifyContent: props.mediaAlign }}
                            dangerouslySetInnerHTML={{ __html: output_data['text/html'].join('') }}
                          />
                        );
                      } else if ('text/plain' in output_data) {
                        htmlContent = (
                          <div className="w-full p-2 text-sm text-gray-700 whitespace-pre-wrap">
                            {output_data['text/plain'].join('')}
                          </div>
                        );
                      }
                    }
                    break;
                  }

                  case 'error':
                    htmlContent = (
                      <div className="w-full p-2 bg-red-100 text-red-800 whitespace-pre-wrap text-sm">
                        <Ansi>
                          {output.traceback?.join('\n')}
                        </Ansi>
                      </div>
                    );
                    break;

                  default:
                    console.warn("Unknown output_type: ", output_type);
                }
              }

              return (
                <div key={index} className="flex w-full">
                  {/* <pre className="w-16 pt-1 pr-1 text-right text-orange-600 text-sm">
                    {executionCount ? `[${executionCount}]: ` : null}
                  </pre> */}
                  {htmlContent}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockOutput;
