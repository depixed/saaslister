import { useState, useRef } from 'react';
import { Upload, AlertCircle, FileText, Download } from 'lucide-react';
import Papa from 'papaparse';
import type { Directory } from '../../types';
import { generateSampleCSV } from '../../utils/csvHelper';

interface CSVUploadProps {
  onUpload: (directories: Omit<Directory, 'id'>[]) => Promise<void>;
  onCancel: () => void;
}

export default function CSVUpload({ onUpload, onCancel }: CSVUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateDirectoryData = (row: any, index: number): Omit<Directory, 'id'> => {
    const errors: string[] = [];

    if (!row.name) errors.push('name is required');
    if (!row.url) errors.push('url is required');
    if (!row.da || isNaN(Number(row.da))) errors.push('da must be a valid number');
    if (!row.pa || isNaN(Number(row.pa))) errors.push('pa must be a valid number');
    if (!row.dr || isNaN(Number(row.dr))) errors.push('dr must be a valid number');
    
    // Convert traffic to number and check if it's valid
    const traffic = Number(row.traffic);
    if (isNaN(traffic) || traffic < 0) {
      errors.push('traffic must be a valid positive number');
    }

    if (errors.length > 0) {
      throw new Error(`Row ${index + 1}: ${errors.join(', ')}`);
    }

    return {
      name: row.name.trim(),
      url: row.url.trim(),
      da: parseInt(row.da),
      pa: parseInt(row.pa),
      dr: parseInt(row.dr),
      niches: row.niches ? row.niches.split(',').map((n: string) => n.trim()).filter(Boolean) : [],
      traffic: traffic,
      isPaid: String(row.isPaid).toLowerCase() === 'true',
      logo: row.logo ? row.logo.trim() : '',
      description: row.description ? row.description.trim() : '',
      linkType: (row.linkType?.trim() as Directory['linkType']) || 'Dofollow'
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a valid CSV file');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a valid CSV file');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDownloadSample = () => {
    const csvContent = generateSampleCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample-directories.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const processFile = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError(null);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          if (results.errors.length > 0) {
            setError('Error parsing CSV file: ' + results.errors[0].message);
            setIsUploading(false);
            return;
          }

          if (results.data.length === 0) {
            setError('CSV file is empty');
            setIsUploading(false);
            return;
          }

          // Validate required headers
          const requiredHeaders = ['name', 'url', 'da', 'pa', 'dr', 'traffic'];
          const missingHeaders = requiredHeaders.filter(
            header => !results.meta.fields?.includes(header)
          );

          if (missingHeaders.length > 0) {
            setError(`Missing required columns: ${missingHeaders.join(', ')}`);
            setIsUploading(false);
            return;
          }

          const directories = results.data.map((row: any, index: number) => {
            try {
              return validateDirectoryData(row, index);
            } catch (error) {
              throw error;
            }
          });

          await onUpload(directories);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to process CSV file');
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        setError('Failed to read CSV file: ' + error.message);
        setIsUploading(false);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Bulk Import Directories
        </h2>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Required CSV Columns:
            </h3>
            <button
              onClick={handleDownloadSample}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <Download className="h-4 w-4" />
              Download Sample CSV
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p><code className="text-primary-600 dark:text-primary-400">name</code> - Directory name (required)</p>
              <p><code className="text-primary-600 dark:text-primary-400">url</code> - Website URL (required)</p>
              <p><code className="text-primary-600 dark:text-primary-400">da</code> - Domain Authority, 0-100 (required)</p>
              <p><code className="text-primary-600 dark:text-primary-400">pa</code> - Page Authority, 0-100 (required)</p>
              <p><code className="text-primary-600 dark:text-primary-400">dr</code> - Domain Rating, 0-100 (required)</p>
              <p><code className="text-primary-600 dark:text-primary-400">traffic</code> - Monthly traffic (required)</p>
              <p><code>niches</code> - Comma-separated niches (optional)</p>
              <p><code>isPaid</code> - true/false (optional, defaults to false)</p>
              <p><code>logo</code> - Logo URL (optional)</p>
              <p><code>description</code> - Directory description (optional)</p>
              <p><code>linkType</code> - Dofollow/Nofollow/UGC/Sponsored (optional)</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-md flex items-start gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div 
          className="mt-4 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              cursor-pointer
              mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg
              ${selectedFile 
                ? 'border-primary-500 dark:border-primary-400' 
                : 'border-gray-300 dark:border-gray-600'
              }
              ${isUploading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:border-primary-500 dark:hover:border-primary-400'
              }
              transition-colors
            `}
          >
            <div className="space-y-2 text-center">
              {selectedFile ? (
                <>
                  <FileText className="mx-auto h-12 w-12 text-primary-500 dark:text-primary-400" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Selected: {selectedFile.name}
                  </div>
                </>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-primary-600 dark:text-primary-400">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </div>
                </>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isUploading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={processFile}
            disabled={!selectedFile || isUploading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload CSV'}
          </button>
        </div>
      </div>
    </div>
  );
}