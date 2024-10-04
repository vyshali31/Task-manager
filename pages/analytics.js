import { useAtom } from 'jotai';
import { taskListAtom } from '../store';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Import Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [taskList] = useAtom(taskListAtom);
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  // Check if the user is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn');
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router]);

  // Calculate completed and pending tasks
  useEffect(() => {
    const completed = taskList.filter(task => task.completed).length;
    const pending = taskList.length - completed;
    setCompletedTasks(completed);
    setPendingTasks(pending);
  }, [taskList]);

  const data = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        label: 'Task Status',
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Define handleLogout to log the user out
  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Clear login state
    router.push('/auth/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Analytics</h1>
        <div>
          <Link href="/dashboard"
           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition mr-4">
              Dashboard
           
          </Link>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-center text-xl mb-6">Task Completion Status</h2>
        <Pie data={data} />
      </div>
    </div>
  );
}
