import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', visits: 4000, submissions: 2400 },
  { name: 'Feb', visits: 3000, submissions: 1398 },
  { name: 'Mar', visits: 2000, submissions: 9800 },
  { name: 'Apr', visits: 2780, submissions: 3908 },
  { name: 'May', visits: 1890, submissions: 4800 },
  { name: 'Jun', visits: 2390, submissions: 3800 },
];

export default function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Analytics</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Overview</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#3b82f6" name="Visits" />
              <Bar dataKey="submissions" fill="#10b981" name="Submissions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}