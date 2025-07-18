'use client';

/* prettier-ignore-file */
/* eslint-disable */
import { HiMiniUserGroup } from 'react-icons/hi2';
import React from 'react';
import featuresData from './featuresData';
import SingleFeature from './SingleFeature';
import SectionHeader from '../Common/SectionHeader';
import { Target, Users, Globe, Database, Download, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../Datasets/LoadingOverlay';

const About = () => {

  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/datasets/`)
      .then(res => res.json())
      .then(data => {
        setDatasets(data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching datasets:', err));
  }, []);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // const datasets = featuresData; // Using featuresData as datasets
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-900 py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Missions</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Providing an open, accessible platform for the global research community working on
            multiphase transport phenomena.
          </p>
        </div>

        {/* Mission, Community, and Global Impact */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Our Objectives
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                From raw data to visual insights, the platform supports every step of your research
                process.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Our Community
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Bringing together engineers, researchers, and students to share data, tools, and
                findings.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Global Impact
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Enabling breakthroughs in energy systems, materials design, and fluid transport
                technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="recent-publications" className="mt-16 px-6 py-12">
          <SectionHeader
            headerInfo={{
              title: 'Datahub for Multiphase Transport',
              subtitle: 'Most Recent Datasets',
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5 ">
            {datasets.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
          </div>
        </div>

        {/* Datasets Section */}
        <div id="datasets" className="mt-10">
          <SectionHeader
            headerInfo={{
              title: 'Popular Datasets',
              subtitle: 'Most Downloaded Datasets',
            }}
          />
          <div className="grid gap-6 lg:grid-cols-3 mt-12.5">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow dark:border-gray-700 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {dataset.category ? dataset.category : ''}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {/* {dataset.title} */}
                  {dataset.title || dataset.name
                    ?.split('_')                            // split into words
                    .filter((w, i, arr) =>                  // remove "dataset" if it’s the last word
                      i !== arr.length - 1 || w.toLowerCase() !== 'dataset'
                    )
                    .join(' ')                              // join back with space
                  }
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{dataset.description}</p>
                {/* <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 mt-auto">
                  <span>Size: {dataset.size}</span>
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {dataset.downloads.toLocaleString()}
                  </span>
                </div>
                <div className="flex space-x-4 mt-auto">
                  <button
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => router.push(`/datasets/`)}
                  >
                    Download
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700">
                    <Eye className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                  </button>
                </div> */}
                <div className="mt-auto">
                  {dataset.size ?
                    (<div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Size: {formatSize(dataset.size)}
                    </div>)
                    : null
                  }
                  <div className="flex space-x-4">
                    <button
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => router.push(`/datasets/`)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
