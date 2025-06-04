import React from 'react';

const FileSearchFilter = ({ filters, setFilters, attributes }) => {
  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...(prevFilters[name] || []), value]
        : prevFilters[name]?.filter((v) => v !== value),
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">File Search</h3>

      {/* Input Filters - Compact Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <input
          type="text"
          name="file_name"
          placeholder="File Name"
          value={filters.file_name || ''}
          onChange={handleInputChange}
          className="border p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="file_type"
          placeholder="File Type"
          value={filters.file_type || ''}
          onChange={handleInputChange}
          className="border p-2 rounded-md text-sm"
        />
        <input
          type="number"
          name="file_size"
          placeholder="Min Size (MB)"
          value={filters.file_size || ''}
          onChange={handleInputChange}
          className="border p-2 rounded-md text-sm"
        />
        <input
          type="number"
          name="frequency"
          placeholder="Min Frequency"
          value={filters.frequency || ''}
          onChange={handleInputChange}
          className="border p-2 rounded-md text-sm"
        />
        <label>
          Created on
          <input
            type="date"
            name="created_at"
            onChange={handleInputChange}
            className="border p-2 rounded-md text-sm ml-4"
          />
        </label>
        <label>
          Updated on
          <input
            type="date"
            name="updated_at"
            onChange={handleInputChange}
            className="border p-2 rounded-md text-sm ml-4"
          />
        </label>
      </div>

      {/* File Attributes - Compact Checkbox Layout */}
      <h4 className="text-sm font-semibold text-gray-700 mt-3">Attributes</h4>
      <div className="flex flex-wrap gap-2 mt-1">
        {attributes.map((attr, index) => (
          <label key={index} className="flex items-center text-sm">
            <input
              type="checkbox"
              name="attributes"
              value={attr}
              onChange={handleCheckboxChange}
              className="mr-1"
            />
            {attr}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FileSearchFilter;
