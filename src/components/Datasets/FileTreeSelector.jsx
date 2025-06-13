import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import axios from 'axios';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaChevronRight,
  FaChevronDown,
  FaCheckSquare,
  FaRegSquare,
  FaMinusSquare,
} from 'react-icons/fa';


const truncateName = (name, maxLength = 15) => {
  return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
};



export default function FileTreeSelector({ backendURL, datasetName }) {
  const [treeData, setTreeData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    const fetchTree = async () => {
      const res = await axios.get(`${backendURL}/api/files/tree/`);
      setTreeData(filterDatasetTree(res.data, datasetName));
    };
    fetchTree();
  }, [backendURL, datasetName]);


  const filterDatasetTree = (fullTree, datasetName) => {
    const match = fullTree.find((node) => node.name === datasetName);
    return match ? convertToTreeFormat([match]) : [];
  };


  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertToTreeFormat = (nodes) =>
    nodes.map((node) => {
      const isLeaf = node.type === 'file';
      const isFolder = node.type === 'folder';
      const hasChildren = node.children && node.children.length > 0;

      return {
        value: node.path,
        label: (
          <span title={node.name}>
            {truncateName(node.name)} ({formatSize(node.size || 0)})
          </span>
        ),
        isFolder,
        // icon: isFolder
        //   ? <FaFolder className={hasChildren ? '' : 'text-gray-400'} />
        //   : <FaFile />,
        disabledExpand: isFolder && !hasChildren,
        children: hasChildren ? convertToTreeFormat(node.children) : undefined,
      };
    });




  const handleDownload = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/files/download-selection/`,
        { paths: checked },
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'selected_files.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download error:', err);
      alert('Error downloading selected files.');
    }
  };

  return (
    <div className="text-sm mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-base font-semibold mb-4">Select Files or Folders to Download</h2>
      <CheckboxTree
        nodes={treeData}
        checked={checked}
        expanded={expanded}
        onCheck={setChecked}
        onExpand={setExpanded}
        icons={{
          check: <FaCheckSquare />,
          uncheck: <FaRegSquare />,
          halfCheck: <FaMinusSquare />,
          expandClose: <FaChevronRight />,
          expandOpen: <FaChevronDown />,
          parentClose: <FaFolder />,
          parentOpen: <FaFolderOpen />,
          leaf: <FaFile />,
        }}
      />
      {/* <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
      >
        Download Selected
      </button> */}
    </div>
  );
}