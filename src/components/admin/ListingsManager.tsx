import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Upload, ExternalLink } from 'lucide-react';
import { getAllDirectories, createDirectory, updateDirectory, deleteDirectory } from '../../lib/db';
import type { Directory } from '../../types';
import DirectoryForm from './DirectoryForm';
import CSVUpload from './CSVUpload';
import CircularProgress from '../CircularProgress';

export default function ListingsManager() {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editingDirectory, setEditingDirectory] = useState<Directory | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>([]);

  useEffect(() => {
    loadDirectories();
  }, []);

  const loadDirectories = async () => {
    try {
      setError(null);
      const dirs = await getAllDirectories();
      setDirectories(dirs);
    } catch (error) {
      console.error('Failed to load directories:', error);
      setError('Failed to load directories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDirectories = directories.filter(dir => 
    dir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDirectory = async (directoryData: Omit<Directory, 'id'>) => {
    try {
      setError(null);
      await createDirectory(directoryData);
      await loadDirectories();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add directory:', error);
      setError('Failed to add directory. Please try again.');
    }
  };

  const handleUpdateDirectory = async (directoryData: Omit<Directory, 'id'>) => {
    if (!editingDirectory) return;
    
    try {
      setError(null);
      await updateDirectory(editingDirectory.id, directoryData);
      await loadDirectories();
      setEditingDirectory(undefined);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to update directory:', error);
      setError('Failed to update directory. Please try again.');
    }
  };

  const handleDeleteDirectory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this directory?')) return;
    
    try {
      setError(null);
      await deleteDirectory(id);
      await loadDirectories();
    } catch (error) {
      console.error('Failed to delete directory:', error);
      setError('Failed to delete directory. Please try again.');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedDirectories.length} directories?`)) return;
    
    try {
      setError(null);
      for (const id of selectedDirectories) {
        await deleteDirectory(id);
      }
      setSelectedDirectories([]);
      await loadDirectories();
    } catch (error) {
      console.error('Failed to delete directories:', error);
      setError('Failed to delete directories. Please try again.');
    }
  };

  const handleBulkUpload = async (directories: Omit<Directory, 'id'>[]) => {
    try {
      setError(null);
      for (const directory of directories) {
        await createDirectory(directory);
      }
      await loadDirectories();
      setShowCSVUpload(false);
    } catch (error) {
      console.error('Failed to bulk upload directories:', error);
      setError('Failed to upload directories. Please try again.');
    }
  };

  const toggleDirectorySelection = (id: string) => {
    setSelectedDirectories(prev => 
      prev.includes(id) 
        ? prev.filter(dirId => dirId !== id)
        : [...prev, id]
    );
  };

  const toggleAllDirectories = () => {
    if (selectedDirectories.length === filteredDirectories.length) {
      setSelectedDirectories([]);
    } else {
      setSelectedDirectories(filteredDirectories.map(dir => dir.id));
    }
  };

  if (showCSVUpload) {
    return (
      <CSVUpload
        onUpload={handleBulkUpload}
        onCancel={() => setShowCSVUpload(false)}
      />
    );
  }

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {editingDirectory ? 'Edit Directory' : 'Add New Directory'}
        </h2>
        <DirectoryForm
          directory={editingDirectory}
          onSubmit={editingDirectory ? handleUpdateDirectory : handleAddDirectory}
          onCancel={() => {
            setShowForm(false);
            setEditingDirectory(undefined);
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Listings</h2>
        <div className="flex gap-3">
          {selectedDirectories.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 dark:bg-red-900 dark:border-red-800 dark:text-red-200 dark:hover:bg-red-800"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedDirectories.length})
            </button>
          )}
          <button
            onClick={() => setShowCSVUpload(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            <Upload className="h-4 w-4" />
            Bulk Import
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            Add New Listing
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDirectories.length === filteredDirectories.length}
                    onChange={toggleAllDirectories}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Directory</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Metrics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niches</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDirectories.map((directory) => (
                <tr key={directory.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDirectories.includes(directory.id)}
                      onChange={() => toggleDirectorySelection(directory.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={directory.logo}
                          alt={directory.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{directory.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{directory.url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-4">
                      <CircularProgress value={directory.da} label="DA" size={40} color="blue" />
                      <CircularProgress value={directory.pa} label="PA" size={40} color="green" />
                      <CircularProgress value={directory.dr} label="DR" size={40} color="orange" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {directory.niches.map((niche) => (
                        <span
                          key={niche}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      directory.isPaid
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                    }`}>
                      {directory.isPaid ? 'Paid' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingDirectory(directory);
                        setShowForm(true);
                      }}
                      className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDirectory(directory.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <a
                      href={directory.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}