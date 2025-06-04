// src/components/Datasets/DatasetFiles.jsx
import FileDownloadButton from './FileDownloadButton';
import FileUploadButton from './FileUploadButton';

export default function DatasetFiles({ files }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Dataset Files</h3>
      <ul className="space-y-3">
        {files.map((file) => (
          <li key={file.name} className="flex justify-between items-center">
            <span className="text-lg text-gray-700">{file.name}</span>
            <span className="text-sm text-gray-500">{file.size}</span>
            {/* Pass file object to the FileDownloadButton */}
            <FileDownloadButton file={file} />
            <FileUploadButton file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
}
