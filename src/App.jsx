import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Exercise from "./pages/Exercise";
import Productivity from "./pages/Productivity";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <h2>
            Habit<span>Track</span>
          </h2>

          <nav>
            <Link to="/">🏠 Overview</Link>

            <Link to="/exercise">
              🏃 Exercise
            </Link>

            <Link to="/productivity">
              💻 Productivity
            </Link>

            <Link to="/progress">
              📈 Progress
            </Link>
          </nav>

          <div className="sidebar-bottom">
            <Link to="/settings">
              ⚙️ Settings
            </Link>
          </div>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/exercise"
              element={<Exercise />}
            />

            <Route
            path="/productivity"
            element={<Productivity />}
            />

            <Route
              path="/progress"
              element={
                <h1>Progress coming next...</h1>
              }
            />

            <Route
              path="/settings"
              element={
                <h1>Settings coming next...</h1>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;