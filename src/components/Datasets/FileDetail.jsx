// src/components/FileDetail.jsx
export default function FileDetail({ file }) {
  if (!file) {
    return <div className="text-center text-gray-500">No file selected</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">File Details</h3>
      <p>
        <strong>File Name:</strong> {file.name}
      </p>
      <p>
        <strong>File Size:</strong> {file.size}
      </p>
      <p>
        <strong>File Format:</strong> {file.format}
      </p>
      <a
        href={file.downloadUrl}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 inline-block hover:bg-blue-500 transition"
      >
        Download File
      </a>
    </div>
  );
}
