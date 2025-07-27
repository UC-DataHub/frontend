// pages/datasets/[datasetName]/tree.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
// import DatasetSearchFilter from '@/components/Dataset/DatasetSearchFilter';
import toast from 'react-hot-toast';

export default function DatasetFlatFileListPage() {
  const { datasetName } = useParams();
  const [filters, setFilters] = useState({});
  const [attributeFilters, setAttributeFilters] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!datasetName) return;
    fetchFiltersAndFiles();
  }, [datasetName, filters]);

  const fetchFiltersAndFiles = async () => {
    setLoading(true);
    try {
      const filterRes = await axiosInstance.get('/api/file-attributes/filters/', {
        params: { dataset: datasetName },
      });
      const fileRes = await axiosInstance.get(`/api/files/tree/?dataset=${datasetName}`, {
        params: { ...filters },
      });

      setAttributeFilters(filterRes.data);
      setFileList(fileRes.data);
    } catch (err) {
      console.error('Error loading files:', err);
      toast.error('Failed to load file list');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
      <aside>
        <h2 className="text-lg font-semibold mb-4">Filter & Search</h2>
        {/* <DatasetSearchFilter
          filters={filters}
          setFilters={setFilters}
          attributes={attributeFilters}
        /> */}
      </aside>
      <main>
        <h1 className="text-2xl font-bold mb-4">{datasetName} – Files</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-2">File Name</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Size</th>
                <th className="text-left p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file) => (
                <tr key={file.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-2 break-all">{file.file_name}</td>
                  <td className="p-2">{file.file_type}</td>
                  <td className="p-2">{formatSize(file.file_size)}</td>
                  <td className="p-2">{new Date(file.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
