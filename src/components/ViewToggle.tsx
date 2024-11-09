import { Grid2X2, List } from 'lucide-react';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${
          view === 'grid' ? 'bg-white shadow' : 'hover:bg-white/50'
        }`}
      >
        <Grid2X2 className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          view === 'list' ? 'bg-white shadow' : 'hover:bg-white/50'
        }`}
      >
        <List className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}