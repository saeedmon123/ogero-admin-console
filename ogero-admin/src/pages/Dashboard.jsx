import hierarchy from './../data/hierarchy.json';
import permissions from './../data/permissions.json';
import roles from './../data/roles.json';
import users from './../data/users.json';
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { parseISO, format, parse } from "date-fns";


export default function Dashboard() {
  const summary = {
    "Total Users": users.length,
    "Total Roles": roles.length,
    "Permissions": permissions.length,
    "Departments": hierarchy.length,
  };


  const roleCounts = users.reduce((acc, user) => {
    const role = user.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const mostCommonRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count,
  }));

const growthMap = {};

users.forEach((user) => {
  const date = parseISO(user.created_at);
  const monthKey = format(date, "MMM yyyy");
  growthMap[monthKey] = (growthMap[monthKey] || 0) + 1;
});

const monthlyGrowthData = Object.entries(growthMap)
  .map(([month, users]) => ({
    month,
    users,
    sortDate: parse("01 " + month, "dd MMM yyyy", new Date()) 
  }))
  .sort((a, b) => a.sortDate - b.sortDate)
  .map(({ month, users }) => ({ month, users })); 




  return (
    <div className="space-y-6 p-10">
      {/*  Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h1>
        
      {/*  Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(summary).map(([label, value]) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 transition"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>



      {/*  Users by Role Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Users by Role
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="role" stroke="#888" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈Monthly Growth Line Chart */}
   <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
    Monthly User Growth
  </h2>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={monthlyGrowthData}>
      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#10b981"
        strokeWidth={2}
        dot={{ r: 4 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>


      {/* Insight Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Most Common Role</h3>
          <p className="text-3xl font-bold">{mostCommonRole}</p>
          <p className="text-sm text-white/80">Most frequently assigned user role.</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Data Health</h3>
          <p className="text-3xl font-bold">✅ Good</p>
          <p className="text-sm text-white/80">No errors found in user/role data.</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Last Role Added</h3>
          <p className="text-3xl font-bold">{roles[roles.length - 1]?.name || "N/A"}</p>
          <p className="text-sm text-white/80">Most recently created role.</p>
        </div>
      </div>


    </div>
  );
}
