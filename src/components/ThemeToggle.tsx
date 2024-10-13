// src/components/ThemeToggle.tsx
import React from 'react';

const ThemeToggle: React.FC = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
