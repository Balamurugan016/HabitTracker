import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Repeat,
  Brain,
  BarChart3,
  Settings,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Exercise from "./pages/Exercise";
import Productivity from "./pages/Productivity";
import Habits from "./pages/Habits";

import "./App.css";

function App() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <BrowserRouter>
      <div className="app">

        {/* =========================
            SIDEBAR
        ========================= */}

        <aside className="sidebar">

          {/* Brand */}

          <div className="sidebar-brand">

            <div className="brand-text">
              <h2>
                <span className="brand-habit">Habit</span>
                <span className="brand-track">Track</span>
              </h2>
              <span>PERSONAL SYSTEM</span>
            </div>

          </div>


          {/* Navigation */}

          <nav className="sidebar-nav">

            <div className="nav-section-title">
              WORKSPACE
            </div>

            <NavLink
              to="/"
              className={navLinkClass}
            >
              <LayoutDashboard
                className="nav-icon"
                size={17}
              />

              <span>Dashboard</span>
            </NavLink>


            <NavLink
              to="/exercise"
              className={navLinkClass}
            >
              <Dumbbell
                className="nav-icon"
                size={17}
              />

              <span>Exercise</span>
            </NavLink>


            <NavLink
              to="/habits"
              className={navLinkClass}
            >
              <Repeat
                className="nav-icon"
                size={17}
              />

              <span>Habits</span>
            </NavLink>


            <NavLink
              to="/productivity"
              className={navLinkClass}
            >
              <Brain
                className="nav-icon"
                size={17}
              />

              <span>Productivity</span>
            </NavLink>


            <div className="nav-divider" />


            <div className="nav-section-title">
              ANALYTICS
            </div>

            <NavLink
              to="/progress"
              className={navLinkClass}
            >
              <BarChart3
                className="nav-icon"
                size={17}
              />

              <span>Progress</span>
            </NavLink>

          </nav>


          {/* Bottom */}

          <div className="sidebar-bottom">

            <NavLink
              to="/settings"
              className={navLinkClass}
            >
              <Settings
                className="nav-icon"
                size={17}
              />

              <span>Settings</span>
            </NavLink>

          </div>

        </aside>


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="main">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/exercise"
              element={<Exercise />}
            />

            <Route
              path="/productivity"
              element={<Productivity />}
            />

            <Route
             path="/habits"
             element={<Habits />}
            />

            <Route
              path="/progress"
              element={
                <div className="placeholder-page">
                  Progress
                </div>
              }
            />

            <Route
              path="/settings"
              element={
                <div className="placeholder-page">
                  Settings
                </div>
              }
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;