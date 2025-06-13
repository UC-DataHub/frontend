import React from 'react';

const DatasetSearchFilter = ({ filters, setFilters, attributes }) => {
  // Handles changes in filter inputs
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Filters</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Dataset Name Filter */}
        <input
          type="text"
          name="name"
          placeholder="Dataset Name"
          value={filters.name || ''}
          onChange={handleFilterChange}
          className="border p-2 rounded-md text-sm"
        />

        {/* Description Filter */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={filters.description || ''}
          onChange={handleFilterChange}
          className="border p-2 rounded-md text-sm"
        />

        {/* //Type Dropdown Filter
        <select
          name="type"
          value={filters.type || ""}
          onChange={handleFilterChange}
          className="border p-2 rounded-md text-sm"
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
            className="border p-2 rounded-md text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Created To</label>
          <input
            type="date"
            name="created_to"
            value={filters.created_to || ''}
            onChange={handleFilterChange}
            className="border p-2 rounded-md text-sm"
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
