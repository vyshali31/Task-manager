import '../src/app/globals.css';
// pages/_app.js
//import '../styles/globals.css';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../store'; // Import the dark mode atom
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Apply the dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div>
      {/* Toggle Dark Mode Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      {/* Render the component */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

