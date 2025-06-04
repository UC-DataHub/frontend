import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DatasetSearchFilter from './DatasetSearchFilter';
import UploadModal from './FileUploadModal';
import LoadingOverlay from './LoadingOverlay';
export default function DatasetList() {
  const [datasets, setDatasets] = useState([]); // Store grouped datasets
  const [uploading, setUploading] = useState(false);
  const [filteredDatasets, setFilteredDatasets] = useState([]); // Filtered datasets
  const [filters, setFilters] = useState({}); // Search filters
  const [expandedDataset, setExpandedDataset] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let filtered = datasets;

    if (filters.name) {
      filtered = filtered.filter((dataset) =>
        dataset.name.toLowerCase().includes(filters.name.toLowerCase())
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
  const fetchDatasets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://datahubbe.onrender.com/api/files/');
      if (response.status === 200) {
        setDatasets(groupByDataset(response.data));
      }
    } catch (error) {
      console.error('Error fetching datasets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDatasets(); // Initial fetch on component mount
  }, [fetchDatasets]);

  // Group files under their dataset name
  const groupByDataset = (files) => {
    const datasetMap = {};

    files.forEach((file) => {
      const dataset = file.dataset;
      const datasetId = dataset.id;

      if (!datasetMap[datasetId]) {
        datasetMap[datasetId] = {
          id: datasetId,
          name: dataset.name,
          description: dataset.description || 'No description available',
          created_at: dataset.created_at,
          updated_at: dataset.updated_at,
          icon: dataset.icon || '/images/icon/BubbleID.png',
          files: [],
        };
      }

      datasetMap[datasetId].files.push({
        id: file.id,
        file_name: file.file_name,
        file_type: file.file_type,
        file_path: file.file_path,
        file_size: file.file_size,
      });
    });

    return Object.values(datasetMap);
  };

  // Toggle dataset details view
  const handleViewDetails = (datasetName) => {
    setExpandedDataset(expandedDataset === datasetName ? null : datasetName);
  };

  // Handle file upload
  const handleModalSubmit = async ({ author, datasetName, description, files }) => {
    if (!files.length) return;
    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('dataset_name', datasetName);
    formData.append('description', description);
    formData.append('author', author);

    try {
      const response = await axios.post(
        'https://datahubbe.onrender.com/api/files/upload-folder/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 201) {
        alert(`Dataset "${datasetName}" uploaded successfully!`);
        fetchDatasets();
        setShowUploadModal(false);
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading files.');
    } finally {
      setUploading(false);
    }
  };

  // Handle file download
  const handleDownload = async (datasetName) => {
    try {
      // Start download process
      const response = await axios.get(
        `https://datahubbe.onrender.com/api/files/download-dataset/?dataset_name=${datasetName}`,
        { responseType: 'blob' }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${datasetName}.zip`); // Set filename for the downloaded dataset
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the DOM after download
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading the dataset.');
    }
  };

  return (
    <div>
      {loading && <LoadingOverlay message="Fetching datasets..." />}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleModalSubmit}
        uploading={uploading}
      />
      {/* Upload Button */}
      <div className="flex justify-end mb-6 my-6">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition"
        >
          Upload Dataset
        </button>
      </div>
      <div>
        {/* Search Filters */}
        <DatasetSearchFilter filters={filters} setFilters={setFilters} attributes={{}} />
      </div>

      {/* Dataset List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 pt-10">
        {/* {filteredDatasets.map((dataset) => ( */}
        {filteredDatasets.slice(0, 3).map((dataset) => (
          <motion.div
            key={dataset.id}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="animate_top z-40 rounded-lg border border-gray-100 hover:border-primary bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
          >
            {/* Dynamic Icon Size with Tailwind classes */}
            {/* <div className="relative w-full aspect-square mx-auto rounded-md overflow-hidden"> */}
            <div className="relative w-[100px] sm:w-[100px] md:w-[250px] lg:w-[350px] aspect-square mx-auto rounded-md overflow-hidden">
              <Image src={dataset.icon} alt="Dataset Icon" fill className="object-contain" />
            </div>

            <h3
              className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle sm:text-lg md:text-xl lg:text-2xl 
                break-words sm:break-all md:break-normal md:break-words"
            >
              {dataset.name}
            </h3>
            <p className="mb-5">{dataset.description}</p>

            {/* View Details Button */}
            <button
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
            )}

            {/* Download Entire Dataset Button */}
            <button
              onClick={() => handleDownload(dataset.name)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition block text-center"
            >
              Download Dataset
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
