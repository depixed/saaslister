import { ExternalLink, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Directory } from '../types';
import CircularProgress from './CircularProgress';
import { getAllDirectories } from '../lib/db';

interface DirectoryGridProps {
  directories?: Directory[];
}

export default function DirectoryGrid({ directories: propDirectories }: DirectoryGridProps) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {directories.map((directory) => (
        <div
          key={directory.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={directory.logo}
                alt={directory.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{directory.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{directory.niches[0]}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {directory.description || `High-quality directory with DA ${directory.da} and DR ${directory.dr}`}
            </p>
            <div className="flex justify-between items-center mb-4">
              <CircularProgress value={directory.da} label="DA" color="blue" animate />
              <CircularProgress value={directory.pa} label="PA" color="green" animate />
              <CircularProgress value={directory.dr} label="DR" color="orange" animate />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {(directory.traffic / 1000000).toFixed(1)}M
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                directory.isPaid 
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
              }`}>
                {directory.isPaid ? 'Paid' : 'Free'}
              </span>
            </div>
            <a
              href={directory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <ExternalLink className="h-4 w-4" />
              Submit Link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}