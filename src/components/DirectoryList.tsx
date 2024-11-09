import { ExternalLink, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Directory } from '../types';
import CircularProgress from './CircularProgress';
import { getAllDirectories } from '../lib/db';

interface DirectoryListProps {
  directories?: Directory[];
}

export default function DirectoryList({ directories: propDirectories }: DirectoryListProps) {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDirectories() {
      try {
        if (propDirectories) {
          setDirectories(propDirectories);
        } else {
          const dirs = await getAllDirectories();
          setDirectories(dirs);
        }
      } catch (error) {
        console.error('Error loading directories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDirectories();
  }, [propDirectories]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (directories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No directories found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">
              Website URL
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
              DA
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
              PA
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
              DR
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">
              Niche
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
              Traffic
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
              Type
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {directories.map((directory) => (
            <tr key={directory.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={directory.logo}
                      alt={directory.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {directory.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{directory.url}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <CircularProgress value={directory.da} size={40} color="blue" animate hideLabel />
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <CircularProgress value={directory.pa} size={40} color="green" animate hideLabel />
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <CircularProgress value={directory.dr} size={40} color="orange" animate hideLabel />
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900 dark:text-gray-200 line-clamp-2">
                  {directory.niches.join(', ')}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-900 dark:text-gray-200">
                    {directory.traffic.toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  directory.isPaid 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                }`}>
                  {directory.isPaid ? 'Paid' : 'Free'}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                <a
                  href={directory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 whitespace-nowrap"
                >
                  <ExternalLink className="h-4 w-4" />
                  Submit Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}