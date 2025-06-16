import React from 'react';

const DatasetSearchFilter = ({ filters, setFilters, attributes }) => {
  // Handles changes in filter inputs
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300 bg:transparent dark:bg-transparent">
        Filters
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Dataset Name Filter */}
        <div className="flex flex-col justify-end">
          <label className="text-xs text-gray-600"></label>
          <input
            type="text"
            name="name"
            placeholder="Dataset Name"
            value={filters.name || ''}
            onChange={handleFilterChange}
            className="border border-gray-300 dark:border-strokedark bg-white dark:bg-blacksection text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Filter */}
        <div className="flex flex-col justify-end">
          <label className="text-xs text-gray-600"></label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={filters.description || ''}
            onChange={handleFilterChange}
            className="border border-gray-300 dark:border-strokedark bg-white dark:bg-blacksection text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* //Type Dropdown Filter
        <select
          name="type"
          value={filters.type || ""}
          onChange={handleFilterChange}
          className="border border-gray-300 dark:border-strokedark bg-white dark:bg-blacksection text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          {attributes.types?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */}

        {/* Created Date Range */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Created From</label>
          <input
            type="date"
            name="created_from"
            value={filters.created_from || ''}
            onChange={handleFilterChange}
            className="border border-gray-300 dark:border-strokedark bg-white dark:bg-blacksection text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Created To</label>
          <input
            type="date"
            name="created_to"
            value={filters.created_to || ''}
            onChange={handleFilterChange}
            className="border border-gray-300 dark:border-strokedark bg-white dark:bg-blacksection text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => setFilters({})}
        className="mt-3 bg-blue-500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-600 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default DatasetSearchFilter;
