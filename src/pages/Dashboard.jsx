import { useEffect, useState } from "react";
import HabitCard from "../components/HabitCard";
import { getData, addHabitLog } from "../data/storage";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(() => getData());

  useEffect(() => {
    setData(getData());
  }, []);

  const getTodayDate = () => {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const today = getTodayDate();

  /*
    -------------------------
    TODAY'S HABITS
    -------------------------
  */

  const todayHabits = data.habits.map((habit) => {
    const log = data.habitLogs.find(
      (item) =>
        item.habitId === habit.id &&
        item.date === today
    );

    return {
      ...habit,
      completed: log?.completed === true,
    };
  });

  /*
    -------------------------
    TOGGLE HABIT
    -------------------------
  */

  const toggleHabit = (habitId) => {
    const existingLog = data.habitLogs.find(
      (log) =>
        log.habitId === habitId &&
        log.date === today
    );

    const nextCompleted = !(
      existingLog?.completed === true
    );

    addHabitLog({
      habitId,
      date: today,
      completed: nextCompleted,
    });

    setData(getData());
  };

  /*
    -------------------------
    COMPLETION
    -------------------------
  */

  const completedCount = todayHabits.filter(
    (habit) => habit.completed
  ).length;

  const completionPercentage =
    todayHabits.length === 0
      ? 0
      : Math.round(
          (completedCount / todayHabits.length) * 100
        );

  /*
    -------------------------
    WEEKLY RUNNING
    -------------------------
  */

  const getStartOfWeek = () => {
    const date = new Date();
    const day = date.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    date.setDate(date.getDate() + difference);
    date.setHours(0, 0, 0, 0);

    return date;
  };

  const startOfWeek = getStartOfWeek();

  const weeklyRuns = data.runs.filter((run) => {
    const runDate = new Date(
      run.date || run.createdAt
    );

    return runDate >= startOfWeek;
  });

  const weeklyDistance = weeklyRuns.reduce(
    (total, run) =>
      total + Number(run.distance || 0),
    0
  );

  /*
    -------------------------
    WEEKLY FOCUS
    -------------------------
  */

  const weeklyFocusSessions =
    data.focusSessions.filter((session) => {
      const sessionDate = new Date(
        session.date || session.createdAt
      );

      return sessionDate >= startOfWeek;
    });

  const weeklyFocusMinutes =
    weeklyFocusSessions.reduce(
      (total, session) =>
        total + Number(session.duration || 0),
      0
    );

  const weeklyFocusHours = (
    weeklyFocusMinutes / 60
  ).toFixed(1);

  /*
    -------------------------
    DATE DISPLAY
    -------------------------
  */

  const displayDate = new Date().toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
    }
  );

  return (
    <div className="dashboard">
      {/* HEADER */}

      <header className="header">
        <div>
          <p className="greeting">
            Good evening 👋
          </p>

          <h1>Welcome back, Bala</h1>
        </div>

        <div className="profile">
          <span>🔥 {0} day streak</span>

          <div className="avatar">
            B
          </div>
        </div>
      </header>

      {/* STATS */}

      <section className="stats">

        <div className="stat-card">
          <p>Habit Completion</p>

          <h2>
            {completionPercentage}%
          </h2>

          <span>
            {completedCount}/{todayHabits.length}{" "}
            completed
          </span>
        </div>

        <div className="stat-card">
          <p>Running</p>

          <h2>
            {weeklyDistance.toFixed(1)} km
          </h2>

          <span>
            This week
          </span>
        </div>

        <div className="stat-card">
          <p>Deep Work</p>

          <h2>
            {weeklyFocusHours}h
          </h2>

          <span>
            This week
          </span>
        </div>

      </section>

      {/* MAIN CONTENT */}

      <section className="content-grid">

        {/* TODAY'S HABITS */}

        <div className="habits-card">

          <div className="section-header">
            <h2>
              Today's Habits
            </h2>

            <span>
              {displayDate}
            </span>
          </div>

          {todayHabits.length === 0 ? (
            <div className="dashboard-empty">
              <p>No habits created yet.</p>

              <span>
                Create your first habit to see it here.
              </span>
            </div>
          ) : (
            todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
              />
            ))
          )}

        </div>

        {/* WEEKLY ACTIVITY */}

        <div className="progress-card">

          <div className="section-header">
            <h2>
              Weekly Activity
            </h2>

            <span>
              {weeklyDistance.toFixed(1)} km
            </span>
          </div>

          <div className="chart">

            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />
            <div style={{ height: "0%" }} />

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