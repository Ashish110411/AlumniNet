import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListAlumniComponent from "./components/ListAlumniComponent";
import AlumniComponent from "./components/AlumniComponent";
import ContactAlumniComponent from "./components/ContactAlumniComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
        <header>
          <HeaderComponent />
          <button
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light" : "Dark"} Mode
          </button>
        </header>
        <Routes>
          <Route path="/" element={<ListAlumniComponent />} />
          <Route path="/add-alumni" element={<AlumniComponent />} />
          <Route path="/edit-alumni/:admno" element={<AlumniComponent />} />
          <Route
            path="/contact-alumni/:admno"
            element={<ContactAlumniComponent />}
          />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
