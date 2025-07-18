import fs from 'fs';
import path from 'path';
import Link from 'next/link';


export default function NotebookListPage() {
  const notebooksDir = path.join(process.cwd(), 'src', 'app', '(site)', 'notebook', '[dataset]');
  const files = fs.readdirSync(notebooksDir);
  const ipynbFiles = files.filter(file => file.endsWith('.json'));

  return (
    <div className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Jupyter Notebooks</h1>
      <ul className="flex flex-col gap-4">
        {ipynbFiles.map((file, idx) => {
          const name = file.replace(/\.json$/, '.ipynb');
          return (
            <li key={idx}>
              <Link
                href={`/notebook/${name.replace(/\.ipynb$/, '')}`}
                className="block p-4 rounded bg-white hover:bg-gray-50 transition border border-gray-200"
              >
                <span className="text-lg font-medium text-blue-600">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}