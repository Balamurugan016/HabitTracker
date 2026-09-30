import { useEffect, useState } from "react";
import HabitCard from "../components/HabitCard";
import "./Dashboard.css";

const initialHabits = [
  {
    id: 1,
    name: "Run",
    target: "5 km",
    icon: "🏃",
    category: "Exercise",
    completed: false,
  },
  {
    id: 2,
    name: "Strength Training",
    target: "30 minutes",
    icon: "💪",
    category: "Exercise",
    completed: false,
  },
  {
    id: 3,
    name: "DSA",
    target: "1 hour",
    icon: "🧠",
    category: "Productivity",
    completed: false,
  },
  {
    id: 4,
    name: "React",
    target: "1 hour",
    icon: "⚛️",
    category: "Productivity",
    completed: false,
  },
  {
    id: 5,
    name: "Reading",
    target: "20 pages",
    icon: "📖",
    category: "Productivity",
    completed: false,
  },
];

function Dashboard() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");

    return saved ? JSON.parse(saved) : initialHabits;
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const completionPercentage = Math.round(
    (completedCount / habits.length) * 100
  );

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <p className="greeting">Good evening 👋</p>
          <h1>Welcome back, Bala</h1>
        </div>

        <div className="profile">
          <span>🔥 12 day streak</span>
          <div className="avatar">B</div>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <p>Habit Completion</p>
          <h2>{completionPercentage}%</h2>
          <span>
            {completedCount}/{habits.length} completed
          </span>
        </div>

        <div className="stat-card">
          <p>Running</p>
          <h2>35 km</h2>
          <span>This week</span>
        </div>

        <div className="stat-card">
          <p>Deep Work</p>
          <h2>18.5h</h2>
          <span>This week</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="habits-card">
          <div className="section-header">
            <h2>Today's Habits</h2>
            <span>30 Sep</span>
          </div>

          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
            />
          ))}
        </div>

        <div className="progress-card">
          <div className="section-header">
            <h2>Weekly Activity</h2>
            <span>35 km</span>
          </div>

          <div className="chart">
            <div style={{ height: "45%" }} />
            <div style={{ height: "70%" }} />
            <div style={{ height: "55%" }} />
            <div style={{ height: "90%" }} />
            <div style={{ height: "65%" }} />
            <div style={{ height: "80%" }} />
            <div style={{ height: "40%" }} />
          </div>

          <div className="days">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;