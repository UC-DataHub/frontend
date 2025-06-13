'use client';

/* prettier-ignore-file */
/* eslint-disable */

import React, { useState } from 'react';
import { Search, Database, Cloud, Waves, Gauge, Atom } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const topics = [
    { icon: <Database size={24} />, name: 'Datasets', link: '/datasets' },
    { icon: <Waves size={24} />, name: 'Analysis' },
    { icon: <Cloud size={24} />, name: 'Flow Pattern' },
    // { icon: <Gauge size={24} />, name: 'Gas-Liquid' },
    { icon: <Atom size={24} />, name: 'Properties' },
  ];

  const quickLinks = [
    {
      title: 'Flow Pattern Data',
      description: 'Explore flow pattern identification datasets',
      icon: <Cloud className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Transport Properties',
      description: 'Access physical property measurements',
      icon: <Waves className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Modeling Tools',
      description: 'Use our modeling and simulation tools',
      icon: <Atom className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Visualization Tools',
      description: 'View interactive plots and charts from experiments',
      icon: <Gauge className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Datahub for Multiphase Transport
          </h1>

          {/* Topic Circles */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {topics.map((topic, index) => (
              <button
                onClick={() => (topic.link ? router.push(topic.link) : null)}
                key={index}
                className="w-28 h-28 flex flex-col items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="p-2 rounded-full bg-white shadow-sm dark:bg-gray-800">
                  {topic.icon}
                </div>
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{topic.name}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          {/* <div className="relative z-10 mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for datasets, experiments, or properties..."
              />
            </div>
          </div> */}

          {/* Quick Link Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 hidden sm:flex">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg ${link.color} mb-4`}>{link.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
