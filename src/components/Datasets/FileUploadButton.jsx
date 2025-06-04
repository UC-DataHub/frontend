export default function FileUploadButton() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg shadow">
      <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Upload File
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
      {file && <p className="text-gray-700">{file.name}</p>}
    </div>
  );
}
