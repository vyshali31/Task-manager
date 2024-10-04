import { useAtom } from 'jotai'; // Only one import of useAtom
import { taskListAtom, filterAtom, darkModeAtom } from '../store'; // Import all necessary atoms at once
import { useState } from 'react'; // Import React useState hook

export default function Tasks() {
  const [taskList, setTaskList] = useAtom(taskListAtom); // Task list state from Jotai
  const [newTask, setNewTask] = useState(''); // New task state using React's useState
  const [filter, setFilter] = useAtom(filterAtom); // Filter state from Jotai
  const [darkMode, setDarkMode] = useAtom(darkModeAtom); // Dark mode state from Jotai

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

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
      
      <ul>
        {taskList
          .filter(task => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed))
          .map((task, index) => (
            <li key={index} onClick={() => handleToggleTask(index)}>
              {task.text} - {task.completed ? 'Done' : 'Pending'}
            </li>
          ))}
      </ul>
    </div>
  );
}
