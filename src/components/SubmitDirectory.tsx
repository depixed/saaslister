import { useState } from 'react';
import { ExternalLink, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Directory } from '../types';

interface AnalysisResult {
  da: number;
  pa: number;
  dr: number;
  traffic: number;
  isAccessible: boolean;
  error?: string;
}

export default function SubmitDirectory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analyzeUrl = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    try {
      // Simulated API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - replace with actual API response
      setAnalysisResult({
        da: Math.floor(Math.random() * 100),
        pa: Math.floor(Math.random() * 100),
        dr: Math.floor(Math.random() * 100),
        traffic: Math.floor(Math.random() * 1000000),
        isAccessible: true
      });
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!analysisResult) return;

    try {
      // Simulated submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsModalOpen(false);
      setUrl('');
      setAnalysisResult(null);
      // Show success message or redirect
    } catch (err) {
      setError('Failed to submit directory. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Submit Directory
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Submit Your Directory
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="https://example.com"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={analyzeUrl}
                      disabled={isAnalyzing || !url}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Analyze'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Domain Authority</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {analysisResult.da}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Page Authority</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {analysisResult.pa}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Domain Rating</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {analysisResult.dr}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Traffic</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {analysisResult.traffic.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      Website is accessible and ready for submission
                    </span>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Submit Directory
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}