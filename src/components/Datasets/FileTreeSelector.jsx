/* prettier-ignore-file */
/* eslint-disable */

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
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";
import axiosInstance from '@/utils/axiosInstance';


const truncateName = (name, maxLength = 15) => {
  return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
};


const CustomTooltip = ({ children, tooltipText }) => (
  <span className="relative group cursor-pointer">
    {children}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white z-50">
      {tooltipText}
    </span>
  </span>
);


export default function FileTreeSelector({ backendURL, datasetName }) {
  const [treeData, setTreeData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchTree = async () => {
      const res = await axios.get(`${backendURL}/api/files/tree/`);
      setTreeData(filterDatasetTree(res.data, datasetName));
    };
    fetchTree();
  }, [backendURL, datasetName]);

  // clear the error if user selects smth
  useEffect(() => {
    if (checked.length > 0) {
      setShowError(false);
      setErrorMessage('');
    }
  }, [checked]);


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
        // label: (
        //   <span title={node.name}>
        //     {truncateName(node.name)} ({formatSize(node.size || 0)})
        //   </span>
        // ),
        label: (
          <CustomTooltip tooltipText={node.name}>
            <span>
              {truncateName(node.name)} ({formatSize(node.size || 0)})
            </span>
          </CustomTooltip>
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
    if (!user) {
      toast.error('Please sign in to download datasets.');
      return;
    }
    if (!user?.is_verified) {
      toast.error('You are not verified yet. Please contact the administrator using the "CONTACT US” bar below to verify your account.');
      return;
    }
    if (checked.length === 0) {
      setShowError(true);
      setErrorMessage('Please select at least one file or folder to download.');
      setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 3000);
      return;
    }

    const toastId = toast.loading('Preparing download...');

    try {

      // ***********************
      // THIS IS FOR S3 Storage
      // ***********************
      const res = await axiosInstance.post(
        '/api/files/download-selection/',
        { paths: checked },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const downloadUrl = res.data.url;
      toast.success('Download ready', { id: toastId });
      window.location.href = downloadUrl;
      // ***********************



      // ***********************
      // THIS IS FOR LOCAL MEDIA Storage
      // ***********************
      // const res = await axiosInstance.post(
      //   `/api/files/download-selection/`,
      //   { paths: checked },
      //   { responseType: 'blob' }
      // );
      // const blob = new Blob([res.data]);
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'selected_files.zip');
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // toast.success('Download ready', { id: toastId });
      // ***********************


    } catch (err) {
      console.error('Download error:', err);
      toast.error('Error preparing download', { id: toastId });
    }
  };

  return (
    <div className="text-sm mt-10 p-5 rounded-lg border border-gray-200 dark:border-strokedark shadow-lg bg-white dark:bg-blacksection dark:text-white transition-all">
      <h2 className="text-base font-semibold mb-4 text-black dark:text-white">
        Select Files or Folders to Download
      </h2>
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
      {showError && (
        <div className="mt-4 text-red-600 dark:text-red-400">
          <p>{errorMessage}</p>
        </div>
      )}
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Selected: {checked.length} {checked.length === 1 ? 'item' : 'items'}
      </p>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition"
      >
        Download Selected
      </button>
    </div>
  );
}