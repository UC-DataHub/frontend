'use client';

import { useEffect, useState } from 'react';

export default function DatasetFiltering({ filters, setFilters, attributes }) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleAttributeChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key, val, checked) => {
    const prevVals = filters[key] || [];
    const updatedVals = checked
      ? [...prevVals, val]
      : prevVals.filter((v) => v !== val);
    setFilters((prev) => ({ ...prev, [key]: updatedVals }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Search Files/Folders</label>
        <input
          type="text"
          className="w-full rounded border px-2 py-1 text-sm"
          placeholder="e.g., AE/inlet or filename"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {Object.entries(attributes).map(([key, attr]) => (
        <div key={key}>
          <label className="block text-sm font-semibold mb-1">
            {key} ({attr.unit})
          </label>

          {attr.type === 'numeric' ? (
            <select
              value={filters[key] || ''}
              onChange={(e) => handleAttributeChange(key, parseFloat(e.target.value))}
              className="w-full rounded border px-2 py-1 text-sm"
            >
              <option value="">Any</option>
              {attr.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <div className="space-y-1">
              {attr.options.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(filters[key] || []).includes(opt)}
                    onChange={(e) => handleCheckboxChange(key, opt, e.target.checked)}
                  />
                  <label className="text-sm">{opt}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
