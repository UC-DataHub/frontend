'use client'; // Ensure client-side execution
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '@/components/Hero';
import DatasetSearchFilter from '../../../components/Datasets/DatasetSearchFilter';
import DatasetList from '../../../components/Datasets/DatasetList';
import DatasetDetail from '../../../components/Datasets/DatasetDetail';
import DatasetFiles from '../../../components/Datasets/DatasetFiles';
import FileDetail from '../../../components/Datasets/FileDetail';
import Breadcrumbs from '../../../components/Datasets/Breadcrumbs';
import AttributeFilterSidebar from '../../../components/Datasets/AttributeFilterSidebar';
import LoadingOverlay from '@/components/Datasets/LoadingOverlay';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/api/auth/firebase';

export default function DatasetPage() {
  const [filters, setFilters] = useState({});
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://datahubbe.onrender.com';

  useEffect(() => {
    async function fetchDatasets() {
      try {
        const response = await axios.get(`${backendURL}/api/files/`);
        // console.log("Fetched datasets:", response.data); // Debugging

        // Map the response to match the expected structure
        const formattedData = response.data.map((file) => ({
          id: file.id,
          name: file.file_name, // Use file_name instead of name
          description: file.dataset?.description || 'No description available',
          fileType: file.file_type,
          filePath: file.file_path,
          fileSize: file.file_size,
          createdAt: file.created_at,
          updatedAt: file.updated_at,
          datasetName: file.dataset?.name || 'Unknown Dataset',
        }));

        setDatasets(formattedData);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDatasets();
  }, []);

  const handleDatasetClick = (datasetName) => {
    const dataset = datasets.find((data) => data.name === datasetName);
    setSelectedDataset(dataset);
  };

  // const router = useRouter();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.push('/auth/signin?redirect=/datasets');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [router]);

  return (
    <main>
      {/* Display full-screen loading overlay while datasets are being fetched */}
      {loading && <LoadingOverlay message="Fetching datasets..." />}

      <Hero />
      <div className="container mx-auto p-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="col-span-1 md:col-span-1">
          {/* Left sidebar with filters */}
          {/* <div className="col-span-1 md:col-span-1">
            <AttributeFilterSidebar />
          </div> */}

          {/* Main content area */}
          <div className="col-span-2 md:col-span-2">
            {/* Dataset list or loader */}
            {!loading && <DatasetList datasets={datasets} onDatasetClick={handleDatasetClick} />}

            {/* Show details of selected dataset */}
            {selectedDataset && (
              <>
                <DatasetDetail dataset={selectedDataset} />
                <DatasetFiles
                  files={[{ name: selectedDataset.name, downloadUrl: selectedDataset.url }]}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
