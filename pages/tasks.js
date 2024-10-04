import { useAtom } from 'jotai';
import { taskListAtom, filterAtom } from '../store';
import { useState } from 'react';

export default function Tasks() {
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useAtom(filterAtom);

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
import { useAtom } from 'jotai';
import { darkModeAtom } from '../store';

export default function Tasks() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
    </div>
  );
}
