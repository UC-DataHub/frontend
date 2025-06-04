// src/components/AttributeFilterSidebar.jsx
export default function AttributeFilterSidebar() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">Filter Datasets</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600">Dataset Type</label>
          <select className="w-full p-3 border rounded-md text-sm">
            <option>All</option>
            <option>CSV</option>
            <option>JSON</option>
            <option>Excel</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Creation Date</label>
          <input type="date" className="w-full p-3 border rounded-md text-sm" />
        </div>
      </div>
    </div>
  );
}
