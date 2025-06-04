import React, { useEffect, useState } from 'react';
import { fetchDatasets } from '../api';
import { useNavigate } from 'react-router-dom';
import DatasetSearchFilter from '../components/DatasetSearchFilter';

const Home = () => {
  const [datasets, setDatasets] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadDatasets = async () => {
      const data = await fetchDatasets(filters);
      setDatasets(data);
    };
    loadDatasets();
  }, [filters]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Datasets</h1>
      <DatasetSearchFilter filters={filters} setFilters={setFilters} attributes={[]} />
      <div className="mt-4">
        {datasets.length === 0 ? (
          <p className="text-gray-500">No datasets found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datasets.map((dataset) => (
              <li
                key={dataset.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/dataset/${dataset.id}`)}
              >
                <h3 className="text-lg font-semibold text-blue-600">{dataset.name}</h3>
                <p className="text-gray-600">{dataset.description}</p>
                <span className="text-gray-400 text-sm">
                  Created: {new Date(dataset.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
// const Home = () => {
//   const [datasets, setDatasets] = useState([]);
//   const [filters, setFilters] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadDatasets = async () => {
//       const data = await fetchDatasets(filters);
//       setDatasets(data);
//     };
//     loadDatasets();
//   }, [filters]);

//   return (
//     <div className="container">
//       <DatasetSearchFilter
//         filters={filters}
//         setFilters={setFilters}
//         attributes={[]}
//       />

//       <div className="content">
//         <h2>Datasets</h2>
//         {datasets.length === 0 ? (
//           <p>No datasets found.</p>
//         ) : (
//           <ul>
//             {datasets.map((dataset) => (
//               <li
//                 key={dataset.id}
//                 onClick={() => navigate(`/dataset/${dataset.id}`)}
//               >
//                 <h3>{dataset.name}</h3>
//                 <p>{dataset.description}</p>
//                 <span>
//                   Created: {new Date(dataset.created_at).toLocaleDateString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

export default Home;
