import { useState, useEffect } from 'react';
import type { Directory } from '../../types';
import { X } from 'lucide-react';

interface DirectoryFormProps {
  directory?: Directory;
  onSubmit: (directory: Omit<Directory, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function DirectoryForm({ directory, onSubmit, onCancel }: DirectoryFormProps) {
  const [formData, setFormData] = useState<Omit<Directory, 'id'>>({
    name: '',
    url: '',
    da: 0,
    pa: 0,
    dr: 0,
    niches: [],
    traffic: 0,
    isPaid: false,
    logo: '',
    description: '',
    linkType: 'Dofollow'
  });
  const [newNiche, setNewNiche] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (directory) {
      setFormData({
        name: directory.name,
        url: directory.url,
        da: directory.da,
        pa: directory.pa,
        dr: directory.dr,
        niches: directory.niches,
        traffic: directory.traffic,
        isPaid: directory.isPaid,
        logo: directory.logo || '',
        description: directory.description || '',
        linkType: directory.linkType || 'Dofollow'
      });
    }
  }, [directory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNiche = () => {
    if (newNiche && !formData.niches.includes(newNiche)) {
      setFormData(prev => ({
        ...prev,
        niches: [...prev.niches, newNiche]
      }));
      setNewNiche('');
    }
  };

  const removeNiche = (nicheToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      niches: prev.niches.filter(niche => niche !== nicheToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL
          </label>
          <input
            type="url"
            required
            value={formData.url}
            onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Domain Authority (DA)
          </label>
          <input
            type="number"
            required
            min="0"
            max="100"
            value={formData.da}
            onChange={e => setFormData(prev => ({ ...prev, da: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Page Authority (PA)
          </label>
          <input
            type="number"
            required
            min="0"
            max="100"
            value={formData.pa}
            onChange={e => setFormData(prev => ({ ...prev, pa: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Domain Rating (DR)
          </label>
          <input
            type="number"
            required
            min="0"
            max="100"
            value={formData.dr}
            onChange={e => setFormData(prev => ({ ...prev, dr: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Monthly Traffic
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.traffic}
            onChange={e => setFormData(prev => ({ ...prev, traffic: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Logo URL
          </label>
          <input
            type="url"
            value={formData.logo}
            onChange={e => setFormData(prev => ({ ...prev, logo: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Link Type
          </label>
          <select
            value={formData.linkType}
            onChange={e => setFormData(prev => ({ ...prev, linkType: e.target.value as Directory['linkType'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="Dofollow">Dofollow</option>
            <option value="Nofollow">Nofollow</option>
            <option value="UGC">UGC</option>
            <option value="Sponsored">Sponsored</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Niches
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.niches.map(niche => (
            <span
              key={niche}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {niche}
              <button
                type="button"
                onClick={() => removeNiche(niche)}
                className="ml-1 inline-flex items-center p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newNiche}
            onChange={e => setNewNiche(e.target.value)}
            placeholder="Add a niche"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={addNiche}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPaid}
            onChange={e => setFormData(prev => ({ ...prev, isPaid: e.target.checked }))}
            className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            This is a paid listing
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : directory ? 'Update Directory' : 'Add Directory'}
        </button>
      </div>
    </form>
  );
}