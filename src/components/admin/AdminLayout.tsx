import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, ListFilter, Users, BarChart3, Settings, MonitorPlay } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Dashboard from './Dashboard';
import ListingsManager from './ListingsManager';
import UsersManager from './UsersManager';
import Analytics from './Analytics';
import AdvertisementManager from './AdvertisementManager';

export type AdminView = 'dashboard' | 'listings' | 'users' | 'analytics' | 'ads' | 'settings';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Listings', icon: ListFilter, path: 'listings' },
  { name: 'Users', icon: Users, path: 'users' },
  { name: 'Advertisements', icon: MonitorPlay, path: 'ads' },
  { name: 'Analytics', icon: BarChart3, path: 'analytics' },
  { name: 'Settings', icon: Settings, path: 'settings' },
];

export default function AdminLayout() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar navigation={navigation} currentView={currentView} onViewChange={setCurrentView} />
      <div className="lg:pl-72">
        <AdminHeader />
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/listings" element={<ListingsManager />} />
              <Route path="/users" element={<UsersManager />} />
              <Route path="/ads" element={<AdvertisementManager />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}