// src/components/AttributeEditor.jsx
import { useState } from 'react';

export default function AttributeEditor({ dataset, onSave }) {
  const [editedDataset, setEditedDataset] = useState(dataset);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDataset({ ...editedDataset, [name]: value });
  };

  const handleSave = () => {
    onSave(editedDataset);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Edit Dataset Attributes</h3>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          value={editedDataset.title}
          onChange={handleChange}
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-600">Description</label>
        <textarea
          name="description"
          value={editedDataset.description}
          onChange={handleChange}
          className="mt-2 w-full p-3 border rounded-md"
        ></textarea>
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4">
        Save Changes
      </button>
    </div>
  );
}
