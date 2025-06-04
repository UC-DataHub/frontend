export default function DatasetDetail({ dataset }) {
  if (!dataset) return <p className="text-center text-gray-500">No dataset selected.</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">{dataset.file_name}</h2>
        <a
          href={dataset.url}
          download={dataset.file_name}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
        >
          Download
        </a>
      </div>

      {/* Dataset Details */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Dataset Details</h3>
          <ul className="space-y-2">
            <li>
              <strong>File Name:</strong> {dataset.file_name}
            </li>
            <li>
              <strong>Type:</strong> {dataset.file_type || 'Unknown'}
            </li>
            <li>
              <strong>Size:</strong> {(dataset.file_size / 1024).toFixed(2)} KB
            </li>
            <li>
              <strong>Path:</strong> {dataset.file_path}
            </li>
            <li>
              <strong>Created At:</strong> {new Date(dataset.created_at).toLocaleString()}
            </li>
            <li>
              <strong>Updated At:</strong> {new Date(dataset.updated_at).toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
