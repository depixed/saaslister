import { Users, ListFilter, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '2,543', icon: Users, change: '+12%', changeType: 'positive' },
  { name: 'Active Listings', value: '854', icon: ListFilter, change: '+8%', changeType: 'positive' },
  { name: 'Monthly Traffic', value: '45.2K', icon: TrendingUp, change: '+3%', changeType: 'positive' },
  { name: 'Revenue', value: '$12,545', icon: DollarSign, change: '+23%', changeType: 'positive' },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}