import { Trash2 } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
}

export default function BulkActions({ selectedCount, onDelete }: BulkActionsProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <span className="text-sm text-gray-700 dark:text-gray-200">
        {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
      </span>
      <button
        onClick={onDelete}
        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
      >
        <Trash2 className="h-4 w-4" />
        Delete Selected
      </button>
    </div>
  );
}