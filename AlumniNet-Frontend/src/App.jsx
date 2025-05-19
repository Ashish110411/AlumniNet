import './App.css';
import HeaderComponent from "./components/HeaderComponent.jsx";
import ListAlumniComponent from "./components/ListAlumniComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import AlumniComponent from "./components/AlumniComponent.jsx";
import ContactAlumniComponent from "./components/ContactAlumniComponent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const getStoredTheme = () => localStorage.getItem('theme');

  const setStoredTheme = (theme) => {
    localStorage.setItem('theme', theme);
  };

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getPreferredTheme());

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  };

  useEffect(() => {
    applyTheme(theme);
    setStoredTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const stored = getStoredTheme();
      if (stored !== 'light' && stored !== 'dark') {
        const newTheme = getPreferredTheme();
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
      <>
        <BrowserRouter>
          <div className="theme-toggle-container d-flex justify-content-end p-3 bg-body-secondary">

          <button onClick={toggleTheme} className="btn theme-toggle-btn">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<ListAlumniComponent />} />
            <Route path="/alumni" element={<ListAlumniComponent />} />
            <Route path="/add-alumni" element={<AlumniComponent />} />
            <Route path="/contact-alumni/:admno" element={<ContactAlumniComponent />} />
            <Route path="/edit-alumni/:admno" element={<AlumniComponent />} />
          </Routes>
          {/* <FooterComponent /> */}
        </BrowserRouter>
      </>
  );
}

export default App;

