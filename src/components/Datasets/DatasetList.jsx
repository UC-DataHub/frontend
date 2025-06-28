'use client';

/* prettier-ignore-file */
/* eslint-disable */

import axios from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DatasetSearchFilter from './DatasetSearchFilter';
import UploadModal from './FileUploadModal';
import LoadingOverlay from './LoadingOverlay';
import FileTreeSelector from './FileTreeSelector';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';


export default function DatasetList() {
  const [datasets, setDatasets] = useState([]); // Store grouped datasets
  const [uploading, setUploading] = useState(false);
  const [filteredDatasets, setFilteredDatasets] = useState([]); // Filtered datasets
  const [filters, setFilters] = useState({}); // Search filters
  const [expandedDataset, setExpandedDataset] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nx4f.onrender.com';

  useEffect(() => {
    let filtered = datasets;

    if (filters.name) {
      filtered = filtered.filter((dataset) =>
        dataset.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.title) {
      filtered = filtered.filter((dataset) =>
        dataset.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.description) {
      filtered = filtered.filter((dataset) =>
        dataset.description.toLowerCase().includes(filters.description.toLowerCase())
      );
    }

    if (filters.created_from) {
      filtered = filtered.filter(
        (dataset) => new Date(dataset.created_at) >= new Date(filters.created_from)
      );
    }

    if (filters.created_to) {
      filtered = filtered.filter(
        (dataset) => new Date(dataset.created_at) <= new Date(filters.created_to)
      );
    }



    setFilteredDatasets(filtered);
  }, [filters, datasets]);

  // Fetch and group datasets on mount
  // const fetchDatasets = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     // const response = await axios.get(`https://datahubbe.onrender.com/api/files/`);
  //     const response = await axios.get(backendURL+'/api/files/');

  //     if (response.status === 200) {
  //       setDatasets(groupByDataset(response.data));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching datasets:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const fetchDatasets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/datasets/');  // <-- get pre-annotated, ordered list
      if (response.status === 200) {
        setDatasets(response.data);    // no need for groupBy, data is ready
      }
    } catch (error) {
      console.error('Error fetching datasets:', error);
      toast.error('Failed to load datasets.');
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchDatasets(); // Initial fetch on component mount
  }, [fetchDatasets]);

  // Scroll to and highlight the dataset if hash is present in the URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // Delay until after filteredDatasets are rendered
    const timeout = setTimeout(() => {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('ring-4', 'ring-blue-500', 'transition', 'duration-1000');

        setTimeout(() => {
          targetEl.classList.remove('ring-4', 'ring-blue-500');
        }, 3000);
      }
    }, 500); // Delay to allow rendering

    return () => clearTimeout(timeout);
  }, [filteredDatasets]);

  // Group files under their dataset name
  // const groupByDataset = (files) => {
  //   const datasetMap = {};

  //   files.forEach((file) => {
  //     const dataset = file.dataset;
  //     const datasetId = dataset.id;

  //     if (!datasetMap[datasetId]) {
  //       datasetMap[datasetId] = {
  //         id: datasetId,
  //         name: dataset.name,
  //         title: dataset.title || null, // Use title if available, otherwise use name
  //         description: dataset.description || 'No description available',
  //         created_at: dataset.created_at,
  //         updated_at: dataset.updated_at,
  //         icon: dataset.icon || '/images/icon/BubbleID.png',
  //         files: [],
  //       };
  //     }

  //     datasetMap[datasetId].files.push({
  //       id: file.id,
  //       file_name: file.file_name,
  //       file_type: file.file_type,
  //       file_path: file.file_path,
  //       file_size: file.file_size,
  //     });
  //   });

  //   return Object.values(datasetMap);
  // };

  // Toggle dataset details view
  const handleViewDetails = (datasetName) => {
    setExpandedDataset(expandedDataset === datasetName ? null : datasetName);
  };

  // Handle file upload
  const handleModalSubmit = async ({ author, email, datasetName, description, files }) => {
    if (!user) {
      toast.error('You must be logged in to upload datasets.');
      return;
    }
    if (!files.length) return;
    setUploading(true);

    // files size limit 10MB filter
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      toast.error('Total file size exceeds 10MB limit. Please select smaller files.');
      setUploading(false);
      return;
    }

    // dict datasetName: image path
    const datasetIcons = {
      'Bubble_ID_Dataset': '/images/icon/BubbleID.png',
      'Condensation_Dataset': '/images/icon/Condensation.png',
      'Immersion_Cooling_Dataset': '/images/icon/ImmersionCooling.png',
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('dataset_name', datasetName);
    formData.append('description', description);
    formData.append('author', user?.name || author);
    formData.append('email',  user?.email || email);
    //print form data as json from formdata variable
    // console.log('Form data:', JSON.stringify(Object.fromEntries(formData.entries()), null, 2));

    try {
      // const response = await axios.post(
      //   // `https://datahubbe.onrender.com/api/files/upload-folder/`,
      //   backendURL + '/api/files/upload-folder/',
      //   formData,
      //   {
      //     headers: { 'Content-Type': 'multipart/form-data' },
      //     withCredentials: true,
      //   }
      // );

      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.post('/api/files/upload-folder/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      if (response.status === 201) {
        toast.success(`Dataset "${datasetName}" uploaded successfully! We will review it soon.`);
        fetchDatasets();
        setShowUploadModal(false);
      } else {
        toast.error('Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading files.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div id="dataset-list">
      {loading && <LoadingOverlay message="Fetching datasets..." />}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleModalSubmit}
        uploading={uploading}
        user={user}
      />
      {/* Upload Button */}
      {/* <div className="flex justify-end mb-6 my-6">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition"
        >
          Upload Dataset
        </button>
      </div> */}




      <div className="w-full px-6 py-14 bg-gradient-to-br from-white to-blue-50 dark:from-blacksection dark:to-gray-900 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-xl mb-14 transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">
          Available Datasets
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
        <DatasetSearchFilter filters={filters} setFilters={setFilters} attributes={{}} />
      </div>

      {/* Dataset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-10">
        {/* {filteredDatasets.map((dataset) => ( */}
        {filteredDatasets.slice(0, 5).map((dataset) => (
          <motion.div
            key={dataset.id}
            id={dataset.name}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:flex md:flex-col md:h-full animate_top z-40 rounded-lg border border-gray-100 hover:border-primary bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
          >
            {/* Dynamic Icon Size with Tailwind classes */}
            {/* <div className="relative w-full aspect-square mx-auto rounded-md overflow-hidden"> */}
            <div className="relative w-full h-[200px] mx-auto flex items-center justify-center bg-white dark:bg-blacksection">
              <Image
                src={
                  dataset.name === 'Bubble_ID_Dataset'
                    ? '/images/icon/BubbleID.png'
                    : dataset.name === 'Condensation_Dataset'
                    ? '/images/icon/Condensation.png'
                    : dataset.name === 'Immersion_Cooling_Dataset'
                    ? '/images/icon/ImmersionCooling.png'
                    : dataset.name === 'Drop_Impact_Dataset'
                    ? '/images/icon/DropImpact.png'
                    : dataset.name === 'Particle_Deposition_Dataset'
                    ? '/images/icon/ParticleDeposition.png'
                    : '/images/icon/db.png'
                }
                alt="Dataset Icon"
                fill
                className="object-contain"
              />
            </div>


            <h3
              className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle sm:text-lg md:text-xl lg:text-2xl
                break-words sm:break-all md:break-normal md:break-words"
            >
              {dataset.title || dataset.name
                ?.split('_')                            // split into words
                .filter((w, i, arr) =>                  // remove "dataset" if it’s the last word
                  i !== arr.length - 1 || w.toLowerCase() !== 'dataset'
                )
                .join(' ')                              // join back with space
              }
            </h3>
            <p className="mb-5 sm:h-[160px] overflow-hidden text-ellipsis">{dataset.description}</p>

            {/* View Details Button */}
            {/* <button
              onClick={() => handleViewDetails(dataset.name)}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              {expandedDataset === dataset.name ? 'Hide Details' : 'View Details'}
            </button>

            {expandedDataset === dataset.name && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Files:</h4>
                <ul className="text-sm text-gray-600">
                  {dataset.files.map((file) => (
                    <li key={file.id} className="flex justify-between items-center mb-2">
                      <span className="block w-full mb-2 overflow-hidden md:overflow-ellipsis lg:whitespace-nowrap lg:break-words">
                        {file.file_name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}


            <FileTreeSelector backendURL={backendURL} datasetName={dataset.name} />

            {/* Download Entire Dataset Button */}
            {/* <button
              onClick={() => handleDownload(dataset.name)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition block text-center"
            >
              Download Dataset
            </button> */}
          </motion.div>
        ))}
      </div>

      {/* <div className="flex justify-end mb-6 my-6">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition"
        >
          Upload Dataset
        </button>
      </div> */}

      <section className="w-full px-6 py-10 bg-white dark:bg-blacksection rounded-lg border border-gray-200 dark:border-gray-700 shadow-md mb-10 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white mb-3">
            Upload Your Dataset
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Upload experimental or simulation data with complete folder structure. You can upload a ZIP
            or a structured folder directly. Once reviewed by admin, it will be visible on the platform.
          </p>

          <div
            className="border-2 border-dashed border-blue-500 p-8 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => {
              if (user) {
                setShowUploadModal(true);
                // if (user?.is_verified) {
                //   setShowUploadModal(true);
                // } else {
                //   toast.error('Please verify your email to upload files.');
                // }
              } else {
                toast.error('Login required to upload');
              }
            }}
          >
            <svg
              className="mx-auto mb-4 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">Click to Upload</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Opens the upload form with author, description, and file selection
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

