import { Filter as FilterIcon, ChevronDown, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { Filter, FilterState } from '../types';

const filters: Filter[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      'Product Hunt',
      'Difficult Subreddits',
      'Top DR Directories',
      'Directories',
      'Subreddits easy',
      'Indie Hackers',
      'Publication',
      'Discord & Slack',
      'LinkedIn & FB',
      'Investor',
      'Launch Services',
      'Exit Platforms',
    ],
  },
  {
    id: 'linkType',
    label: 'Link Type',
    options: ['Dofollow', 'Nofollow', 'UGC', 'Sponsored'],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    options: ['Free', 'Paid'],
  },
];

interface FiltersProps {
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ activeFilters, onFilterChange }: FiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filterId: string, value: string) => {
    onFilterChange((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        [filterId]: updated,
      };
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const getSelectedCount = (filterId: string): number => {
    return (activeFilters[filterId] || []).length;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">Filters:</span>
          </div>
          
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === filter.id ? null : filter.id)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200"
              >
                {filter.label}
                {getSelectedCount(filter.id) > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-xs">
                    {getSelectedCount(filter.id)}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {openDropdown === filter.id && (
                <div className="absolute z-10 mt-2 w-56 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600">
                  <div className="p-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-500 dark:bg-gray-600"
                          checked={(activeFilters[filter.id] || []).includes(option)}
                          onChange={() => toggleFilter(filter.id, option)}
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-200">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {Object.values(activeFilters).some(filters => filters.length > 0) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}