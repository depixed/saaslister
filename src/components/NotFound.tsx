import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <div className="relative">
            <div className="text-9xl font-bold text-primary-600/10 dark:text-primary-500/10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Page not found</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Sorry, we couldn't find the page you're looking for.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors w-full sm:w-auto justify-center"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            If you believe this is a mistake, please{' '}
            <a href="mailto:support@example.com" className="text-primary-600 dark:text-primary-400 hover:underline">
              contact support
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}