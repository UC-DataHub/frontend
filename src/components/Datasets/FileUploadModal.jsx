import { useState, useEffect } from 'react'

export default function UploadModal({ isOpen, onClose, onSubmit, uploading, user }) {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [datasetName, setDatasetName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setAuthor(user?.name || '')
      setEmail(user?.email || '')
      setDatasetName('')
      setDescription('')
      setFiles([])
      setFileError('')
    }
  }, [isOpen, user])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onSubmit({ author, email, datasetName, description, files })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Upload Dataset
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1" htmlFor='author'>
              Author
              {user?.name && (
                <span className="text-xs text-gray-500 dark:text-gray-400">(readonly)</span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                id='author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`w-full rounded-md border py-2 px-4 ${
                  user?.email
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                    : 'bg-white text-black dark:bg-blacksection dark:text-white'
                } border-gray-300 dark:border-strokedark`}
                readOnly={!!user?.name}
              />
              {user?.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" title="Pre-filled">
                  🔒
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1" htmlFor="email">
              Email
              {user?.email && (
                <span className="text-xs text-gray-500 dark:text-gray-400">(readonly)</span>
              )}
            </label>
            <div className="relative">
              <input
                type="email"
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-md border py-2 px-4 ${
                  user?.email
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                    : 'bg-white text-black dark:bg-blacksection dark:text-white'
                } border-gray-300 dark:border-strokedark`}
                readOnly={!!user?.email}
              />
              {user?.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" title="Pre-filled">
                  🔒
                </div>
              )}
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="datasetName">Dataset Name</label>
            <input
              type="text"
              id="datasetName"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Files</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="block w-full text-sm text-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              required
            />
            {files.length > 0 && (
              <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 list-disc pl-5 max-h-24 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
