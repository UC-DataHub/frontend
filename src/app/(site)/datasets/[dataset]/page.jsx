// // 'use client';

// // import { useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import toast from 'react-hot-toast';

// // // Static JSON imports
// // import fileTreeJson from './CondensationData/condensation_file_tree.json';
// // import filterMeta from './CondensationData/condensation_filter_metadata.json';

// // // Flatten only files, inherit parent attributes
// // const collectFilteredFiles = (node, activeFilters, inheritedAttrs = {}) => {
// //   const attrs = node.attributes || inheritedAttrs;
// //   let files = [];

// //   if (node.type === 'file') {
// //     const passes = Object.entries(activeFilters).every(([key, val]) => {
// //       return val === 'Any' || String(attrs[key]) === String(val);
// //     });
// //     if (passes) files.push({ ...node, attributes: attrs });
// //   } else if (node.children) {
// //     node.children.forEach((child) => {
// //       files = files.concat(collectFilteredFiles(child, activeFilters, attrs));
// //     });
// //   }

// //   return files;
// // };

// // // Format file size nicely
// // const formatSize = (bytes) => {
// //   if (!bytes) return '0 B';
// //   const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
// //   const i = Math.floor(Math.log(bytes) / Math.log(1024));
// //   return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
// // };

// // export default function CondensationDatasetPage() {
// //   const user = useSelector((state) => state.auth.user);

// //   const [filters, setFilters] = useState({});
// //   const [checked, setChecked] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   // Get filtered files
// //   const filteredFiles = collectFilteredFiles(fileTreeJson, filters);
// //   const visibleFiles = searchQuery
// //     ? filteredFiles.filter(f => f.path.toLowerCase().includes(searchQuery.toLowerCase()))
// //     : filteredFiles;

// //   const handleDownload = async () => {
// //     if (!user) return toast.error('Please sign in.');
// //     if (!user?.is_verified) return toast.error('You are not verified yet.');
// //     if (checked.length === 0) return setErrorMessage('Select at least one file to download.');
// //     const toastId = toast.loading('Preparing download...');

// //     try {
// //       const res = await fetch('/api/files/download-selection/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ paths: checked }),
// //       });
// //       const data = await res.json();
// //       toast.success('Download ready', { id: toastId });
// //       window.location.href = data.url;
// //     } catch {
// //       toast.error('Download failed', { id: toastId });
// //     }
// //   };

// //   return (
// //     <main className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
// //       <h1 className="text-3xl font-bold mb-6">Condensation Dataset Page</h1>

// //       <div className="flex w-full gap-6 p-6 max-w-[1200px] mx-auto">
// //         {/* Filter Sidebar */}
// //         <aside className="w-[300px] shrink-0">
// //           <h2 className="text-lg font-semibold mb-4">Filter Files</h2>
// //           {Object.entries(filterMeta).map(([key, meta]) => (
// //             <div className="mb-3" key={key}>
// //               <label className="block mb-1 text-sm font-medium">
// //                 {key}{' '}
// //                 <span className="text-gray-500 text-xs">({meta.description})</span>
// //               </label>
// //               <select
// //                 className="w-full border border-gray-300 rounded px-2 py-1 text-black"
// //                 value={filters[key] || 'Any'}
// //                 onChange={(e) =>
// //                   setFilters((prev) => ({ ...prev, [key]: e.target.value }))
// //                 }
// //               >
// //                 <option value="Any">Any</option>
// //                 {meta.options.map((opt) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           ))}
// //         </aside>

// //         {/* File Listing Section */}
// //         <section className="flex-1 overflow-x-hidden">
// //           <input
// //             type="text"
// //             placeholder="Search file path..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="mb-4 p-2 border rounded w-full text-black"
// //           />

// //           {visibleFiles.length === 0 ? (
// //             <p>No files match current filters/search.</p>
// //           ) : (
// //             <div className="space-y-2 max-h-[600px] overflow-auto border rounded p-4">
// //               {visibleFiles.map((file) => (
// //                 <label key={file.path} className="flex items-center gap-2 text-sm">
// //                   <input
// //                     type="checkbox"
// //                     value={file.path}
// //                     checked={checked.includes(file.path)}
// //                     onChange={(e) => {
// //                       if (e.target.checked) {
// //                         setChecked((prev) => [...prev, file.path]);
// //                       } else {
// //                         setChecked((prev) =>
// //                           prev.filter((p) => p !== file.path)
// //                         );
// //                       }
// //                     }}
// //                   />
// //                   <span className="truncate" title={file.path}>
// //                     {file.path} ({formatSize(file.size)})
// //                   </span>
// //                 </label>
// //               ))}
// //             </div>
// //           )}

// //           {errorMessage && (
// //             <div className="mt-4 text-red-600 dark:text-red-400">{errorMessage}</div>
// //           )}

// //           <p className="mt-2 text-gray-500 dark:text-gray-400">
// //             Selected: {checked.length} {checked.length === 1 ? 'file' : 'files'}
// //           </p>

// //           <button
// //             onClick={handleDownload}
// //             className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition"
// //           >
// //             Download Selected
// //           </button>
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import fileTreeJson from './CondensationData/condensation_file_tree.json';
// import filterMeta from './CondensationData/condensation_filter_metadata.json';

// const collectFilteredFiles = (node, activeFilters, inheritedAttrs = {}) => {
//   const attrs = node.attributes || inheritedAttrs;
//   let files = [];

//   if (node.type === 'file') {
//     const passes = Object.entries(activeFilters).every(([key, val]) => {
//       return !val || val.length === 0 || val.includes(attrs[key]);
//     });
//     if (passes) files.push({ ...node, attributes: attrs });
//   } else if (node.children) {
//     node.children.forEach((child) => {
//       files = files.concat(collectFilteredFiles(child, activeFilters, attrs));
//     });
//   }

//   return files;
// };

// const formatSize = (bytes) => {
//   if (!bytes) return '0 B';
//   const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
// };

// export default function CondensationDatasetPage() {
//   const user = useSelector((state) => state.auth.user);
//   const [filters, setFilters] = useState({});
//   const [checked, setChecked] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const filteredFiles = collectFilteredFiles(fileTreeJson, filters);
//   const visibleFiles = searchQuery
//     ? filteredFiles.filter(f => f.path.toLowerCase().includes(searchQuery.toLowerCase()))
//     : filteredFiles;

//   const allVisibleChecked = visibleFiles.length > 0 && visibleFiles.every(f => checked.includes(f.path));
//   const toggleSelectAll = () => {
//     if (allVisibleChecked) {
//       setChecked((prev) => prev.filter(p => !visibleFiles.some(f => f.path === p)));
//     } else {
//       const newPaths = visibleFiles.map(f => f.path);
//       setChecked((prev) => Array.from(new Set([...prev, ...newPaths])));
//     }
//   };

//   const handleDownload = async () => {
//     if (!user) return toast.error('Please sign in.');
//     if (!user?.is_verified) return toast.error('You are not verified yet.');
//     if (checked.length === 0) return setErrorMessage('Select at least one file to download.');
//     const toastId = toast.loading('Preparing download...');

//     try {
//       const res = await fetch('/api/files/download-selection/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ paths: checked }),
//       });
//       const data = await res.json();
//       toast.success('Download ready', { id: toastId });
//       window.location.href = data.url;
//     } catch {
//       toast.error('Download failed', { id: toastId });
//     }
//   };

//   return (
//     <main className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
//       <h1 className="text-3xl font-bold mb-6">Condensation Dataset Page</h1>

//       <div className="flex w-full gap-6 p-6 max-w-[1200px] mx-auto">
//         <aside className="w-[300px] shrink-0 sticky top-28 h-fit bg-white dark:bg-dark-900 border rounded p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Filter Files</h2>
//             <button
//               onClick={() => setFilters({})}
//               className="text-xs text-blue-600 underline"
//             >
//               Clear All
//             </button>
//           </div>

//           {Object.entries(filterMeta).map(([key, meta]) => {
//             const selectedValues = filters[key] || [];
//             const toggleValue = (val) => {
//               const updated = selectedValues.includes(val)
//                 ? selectedValues.filter((v) => v !== val)
//                 : [...selectedValues, val];
//               setFilters((prev) => ({ ...prev, [key]: updated }));
//             };
//             const allSelected = selectedValues.length === meta.options.length;
//             const toggleAll = () => {
//               setFilters((prev) => ({
//                 ...prev,
//                 [key]: allSelected ? [] : meta.options,
//               }));
//             };

//             return (
//               <div key={key} className="mb-4">
//                 <label className="block mb-1 font-medium text-sm">
//                   {key} <span className="text-gray-500 text-xs">({meta.description})</span>
//                 </label>
//                 <div className="ml-1 space-y-1">
//                   <label className="block text-sm">
//                     <input
//                       type="checkbox"
//                       checked={allSelected}
//                       onChange={toggleAll}
//                       className="mr-1"
//                     />
//                     <span className="font-semibold">All</span>
//                   </label>
//                   {meta.options.map((val) => (
//                     <label key={val} className="block text-sm">
//                       <input
//                         type="checkbox"
//                         checked={selectedValues.includes(val)}
//                         onChange={() => toggleValue(val)}
//                         className="mr-1"
//                       />
//                       {val}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </aside>

//         <section className="flex-1 overflow-x-hidden">
//           <input
//             type="text"
//             placeholder="Search file path..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="mb-4 p-2 border rounded w-full text-black"
//           />

//           {visibleFiles.length === 0 ? (
//             <p>No files match current filters/search.</p>
//           ) : (
//             <div className="space-y-2 max-h-[900px] min-w-[800px] overflow-auto border rounded p-4">
//               <label className="flex items-center gap-2 text-sm font-semibold">
//                 <input
//                   type="checkbox"
//                   checked={allVisibleChecked}
//                   onChange={toggleSelectAll}
//                 />
//                 Select All ({visibleFiles.length} files)
//               </label>
//               {visibleFiles.map((file) => (
//                 <label key={file.path} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     value={file.path}
//                     checked={checked.includes(file.path)}
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setChecked((prev) => [...prev, file.path]);
//                       } else {
//                         setChecked((prev) => prev.filter((p) => p !== file.path));
//                       }
//                     }}
//                   />
//                   <span className="truncate" title={file.path}>
//                     {file.path.split('/').slice(1).join('/')} ({formatSize(file.size)})
//                   </span>
//                 </label>
//               ))}
//             </div>
//           )}

//           {errorMessage && (
//             <div className="mt-4 text-red-600 dark:text-red-400">{errorMessage}</div>
//           )}

//           <p className="mt-2 text-gray-500 dark:text-gray-400">
//             Selected: {checked.length} {checked.length === 1 ? 'file' : 'files'}
//           </p>

//           <button
//             onClick={handleDownload}
//             className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition"
//           >
//             Download Selected
//           </button>
//         </section>
//       </div>
//     </main>
//   );
// }



'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import fileTreeJson_Condensation from './CondensationData/condensation_file_tree.json';
import filterMeta_Condensation from './CondensationData/condensation_filter_metadata.json';
import fileTreeJson_DropImpact from './DropImpactData/drop_impact_file_tree.json';
import filterMeta_DropImpact from './DropImpactData/drop_impact_filter_metadata.json';
import fileTreeJson_ParticleDeposition from './ParticleDepositionData/particle_deposition_file_tree.json';
import filterMeta_ParticleDeposition from './ParticleDepositionData/particle_deposition_filter_metadata.json';
import { useParams } from 'next/navigation';


const collectFilteredFiles = (node, activeFilters, inheritedAttrs = {}) => {
  const attrs = node.attributes || inheritedAttrs;
  let files = [];

  if (node.type === 'file') {
    const passes = Object.entries(activeFilters).every(([key, val]) => {
      return !val || val.length === 0 || val.includes(attrs[key]);
    });
    if (passes) files.push({ ...node, attributes: attrs });
  } else if (node.children) {
    node.children.forEach((child) => {
      files = files.concat(collectFilteredFiles(child, activeFilters, attrs));
    });
  }

  return files;
};

const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

export default function CondensationDatasetPage() {
  const dataset = useParams().dataset;
  const user = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({});
  const [checked, setChecked] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const fileTreeJson = dataset === 'Condensation_Dataset' ? fileTreeJson_Condensation : fileTreeJson_DropImpact;
  // const filterMeta = dataset === 'Condensation_Dataset' ? filterMeta_Condensation : filterMeta_DropImpact;
  let fileTreeJson, filterMeta;
  if (dataset === 'Condensation_Dataset') {
    fileTreeJson = fileTreeJson_Condensation;
    filterMeta = filterMeta_Condensation;
  } else if (dataset === 'Drop_Impact_Dataset') {
    fileTreeJson = fileTreeJson_DropImpact;
    filterMeta = filterMeta_DropImpact;
  } else if (dataset === 'Particle_Deposition_Dataset') {
    fileTreeJson = fileTreeJson_ParticleDeposition;
    filterMeta = filterMeta_ParticleDeposition;
  } else {
    return (
      <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
        <h1 className="text-3xl font-bold mb-6">
          We are working on this dataset page!
        </h1>
    </main>
    );
  }

  const filteredFiles = collectFilteredFiles(fileTreeJson, filters);
  const visibleFiles = searchQuery
    ? filteredFiles.filter(f => f.path.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredFiles;

  const allVisibleChecked = visibleFiles.length > 0 && visibleFiles.every(f => checked.includes(f.path));
  const toggleSelectAll = () => {
    if (allVisibleChecked) {
      setChecked((prev) => prev.filter(p => !visibleFiles.some(f => f.path === p)));
    } else {
      const newPaths = visibleFiles.map(f => f.path);
      setChecked((prev) => Array.from(new Set([...prev, ...newPaths])));
    }
  };

  const handleDownload = async () => {
    if (!user) return toast.error('Please sign in.');
    if (!user?.is_verified) return toast.error('You are not verified yet.');
    if (checked.length === 0) return setErrorMessage('Select at least one file to download.');
    const toastId = toast.loading('Preparing download...');

    try {
      const res = await fetch('/api/files/download-selection/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths: checked }),
      });
      const data = await res.json();
      toast.success('Download ready', { id: toastId });
      window.location.href = data.url;
    } catch {
      toast.error('Download failed', { id: toastId });
    }
  };

  return (
    <main className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">{dataset?.replace(/_/g, ' ')} Page</h1>
      <div className="flex w-full gap-6 p-6 max-w-[1200px] mx-auto">
        <aside className="w-[300px] shrink-0 sticky top-28 h-fit bg-white dark:bg-dark-900 border rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter Files</h2>
            <button onClick={() => setFilters({})} className="text-xs text-blue-600 underline">Clear All</button>
          </div>
          {Object.entries(filterMeta).map(([key, meta]) => {
            const selectedValues = filters[key] || [];
            const toggleValue = (val) => {
              const updated = selectedValues.includes(val)
                ? selectedValues.filter((v) => v !== val)
                : [...selectedValues, val];
              setFilters((prev) => ({ ...prev, [key]: updated }));
            };
            const allSelected = selectedValues.length === meta.options.length;
            const toggleAll = () => {
              setFilters((prev) => ({
                ...prev,
                [key]: allSelected ? [] : meta.options,
              }));
            };
            return (
              <div key={key} className="mb-4">
                <label className="block mb-1 font-medium text-sm">
                  {key} <span className="text-gray-500 text-xs">({meta.description})</span>
                </label>
                <div className="ml-1 space-y-1">
                  <label className="block text-sm">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="mr-1" />
                    <span className="font-semibold">All</span>
                  </label>
                  {meta.options.map((val) => (
                    <label key={val} className="block text-sm">
                      <input type="checkbox" checked={selectedValues.includes(val)} onChange={() => toggleValue(val)} className="mr-1" />
                      {val}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </aside>

        <section className="flex-1 overflow-x-auto">
          <input
            type="text"
            placeholder="Search file path..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded w-full text-black"
          />

          {visibleFiles.length === 0 ? (
            <p>No files match current filters/search.</p>
          ) : (
            <div className="max-h-[900px] min-w-[800px] overflow-auto border rounded">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 bg-gray-50 dark:bg-dark-800 border-b">
                  <tr>
                    <th className="px-3 py-2">
                      <input type="checkbox" checked={allVisibleChecked} onChange={toggleSelectAll} />
                    </th>
                    <th className="px-3 py-2 font-medium">File Name</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Size</th>
                    <th className="px-3 py-2 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleFiles.map((file) => {
                    const fileName = file.path.split('/').pop();
                    const fileType = fileName.includes('.') ? fileName.split('.').pop() : 'archive';
                    const fileCreated = file.created || '—'; // placeholder
                    return (
                      <tr key={file.path} className="border-b hover:bg-gray-50 dark:hover:bg-dark-800">
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            value={file.path}
                            checked={checked.includes(file.path)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setChecked((prev) => [...prev, file.path]);
                              } else {
                                setChecked((prev) => prev.filter((p) => p !== file.path));
                              }
                            }}
                          />
                        </td>
                        <td className="px-3 py-2 truncate max-w-[300px]" title={file.path}>{file.path.split('/').slice(1).join('/')}</td>
                        <td className="px-3 py-2">{fileType}</td>
                        <td className="px-3 py-2">{formatSize(file.size)}</td>
                        <td className="px-3 py-2">{fileCreated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-600 dark:text-red-400">{errorMessage}</div>
          )}

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Selected: {checked.length} {checked.length === 1 ? 'file' : 'files'}
          </p>

          <button
            onClick={handleDownload}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition"
          >
            Download Selected
          </button>
        </section>
      </div>
    </main>
  );
}
