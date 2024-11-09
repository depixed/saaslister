import { Lock, Zap } from 'lucide-react';

export default function PaywallCTA() {
  return (
    <div className="relative mt-8 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 p-8 shadow-lg">
      <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm"></div>
      <div className="relative">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              Unlock Full Directory Access
            </h3>
            <p className="mt-2 text-white/80 max-w-2xl">
              Get access to our complete database of high-authority directories, including exclusive paid listings and detailed metrics.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-8">
            <button
              onClick={() => window.location.href = '/pricing'}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 dark:hover:bg-white/90 transition-colors shadow-sm"
            >
              <Zap className="h-5 w-5 mr-2" />
              Upgrade Now
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center text-white/90">
            <Lock className="h-5 w-5 mr-2 text-white/70" />
            <span>100+ Premium Directories</span>
          </div>
          <div className="flex items-center text-white/90">
            <Lock className="h-5 w-5 mr-2 text-white/70" />
            <span>Detailed Metrics & Analytics</span>
          </div>
          <div className="flex items-center text-white/90">
            <Lock className="h-5 w-5 mr-2 text-white/70" />
            <span>Priority Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}