import { useState } from 'react';
import Hero from './Hero';
import Filters from './Filters';
import ViewToggle from './ViewToggle';
import DirectoryList from './DirectoryList';
import DirectoryGrid from './DirectoryGrid';
import PaywallCTA from './PaywallCTA';
import type { ViewMode, FilterState } from '../types';

export default function DirectoryApp() {
  const [view, setView] = useState<ViewMode>('list');
  const [activeFilters, setActiveFilters] = useState<FilterState>({});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Hero />
      <Filters activeFilters={activeFilters} onFilterChange={setActiveFilters} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <ViewToggle view={view} onViewChange={setView} />
        </div>
        {view === 'grid' ? (
          <DirectoryGrid />
        ) : (
          <DirectoryList />
        )}
        <PaywallCTA />
      </main>
    </div>
  );
}