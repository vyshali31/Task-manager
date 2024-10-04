import { useAtom } from 'jotai';
import { taskListAtom } from '../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Dashboard() {
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [newTask, setNewTask] = useState('');
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn');
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTaskList([...taskList, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskList(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = taskList.filter((_, taskIndex) => taskIndex !== index);
    setTaskList(updatedTasks);
  };

  // Define the handleLogout function
  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Clear login status
    router.push('/auth/login'); // Redirect to the login page
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // Task was dropped outside the list
    const reorderedTasks = Array.from(taskList);
    const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedItem);
    setTaskList(reorderedTasks);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <Link href="/analytics"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition mr-4">
              Analytics
            
          </Link>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} className="bg-blue-600 text-white mt-4 p-2 rounded-md hover:bg-blue-500 transition w-full">
          Add Task
        </button>

        {/* DragDropContext for handling drag-and-drop */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-6">
                {taskList.map((task, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="py-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                        <div>
                          <button onClick={() => handleToggleTask(index)} className="mr-4 text-green-500 hover:text-green-400">
                            {task.completed ? '✅' : '⏳'}
                          </button>
                          <button onClick={() => handleDeleteTask(index)} className="text-red-500 hover:text-red-400">
                            🗑️
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
