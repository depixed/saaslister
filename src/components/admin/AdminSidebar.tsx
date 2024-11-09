import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { AdminView } from './AdminLayout';

interface NavigationItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

interface AdminSidebarProps {
  navigation: NavigationItem[];
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

export default function AdminSidebar({ navigation, currentView, onViewChange }: AdminSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-semibold">Directory Admin</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = currentPath === item.path || 
                    (currentPath === '' && item.path === '');
                  
                  return (
                    <li key={item.name}>
                      <Link
                        to={`/admin/${item.path}`}
                        onClick={() => onViewChange(item.path as AdminView || 'dashboard')}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full
                          ${isActive
                            ? 'bg-gray-50 text-primary-600'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}