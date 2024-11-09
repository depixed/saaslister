import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ColorToggle from './ColorToggle';
import SubmitDirectory from './SubmitDirectory';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-white">
                High Authority Directory Listings
              </h1>
              <div className="flex items-center gap-2">
                <ColorToggle />
                <ThemeToggle />
              </div>
            </div>
            <p className="text-xl text-primary-100 mb-8">
              Find the perfect high DR directories to boost your online presence
            </p>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search directories..."
                className="w-full px-4 py-3 rounded-lg pl-12 bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-primary-200" />
            </div>
            <SubmitDirectory />
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Advertise Here</h3>
              <p className="text-primary-100">
                Reach thousands of potential customers looking for high-quality directory listings.
              </p>
              <button className="mt-4 px-6 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}