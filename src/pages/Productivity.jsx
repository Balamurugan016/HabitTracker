import { useEffect, useState } from "react";
import "./Productivity.css";

const initialActivities = [
  {
    id: 1,
    icon: "🧠",
    name: "DSA",
    target: "1 hour",
    completed: false,
  },
  {
    id: 2,
    icon: "⚛️",
    name: "React",
    target: "1 hour",
    completed: false,
  },
  {
    id: 3,
    icon: "🐍",
    name: "Python",
    target: "45 minutes",
    completed: false,
  },
  {
    id: 4,
    icon: "☁️",
    name: "AWS / DevOps",
    target: "1 hour",
    completed: false,
  },
  {
    id: 5,
    icon: "🔐",
    name: "Cybersecurity",
    target: "45 minutes",
    completed: false,
  },
  {
    id: 6,
    icon: "🧑‍💻",
    name: "Project Work",
    target: "2 hours",
    completed: false,
  },
];

function Productivity() {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("productivityActivities");

    return saved
      ? JSON.parse(saved)
      : initialActivities;
  });

  useEffect(() => {
    localStorage.setItem(
      "productivityActivities",
      JSON.stringify(activities)
    );
  }, [activities]);

  const toggleActivity = (id) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              completed: !activity.completed,
            }
          : activity
      )
    );
  };

  const completedCount = activities.filter(
    (activity) => activity.completed
  ).length;

  const completionPercentage = Math.round(
    (completedCount / activities.length) * 100
  );

  return (
    <div className="productivity-page">

      <div className="page-heading">
        <div>
          <p>Productivity</p>
          <h1>Focus on what matters.</h1>
        </div>

        <button className="focus-button">
          + Start Focus
        </button>
      </div>

      {/* Stats */}

      <section className="productivity-stats">

        <div className="productivity-stat">
          <span>🎯</span>

          <div>
            <p>Deep Work</p>
            <h2>18.5h</h2>
            <small>This week</small>
          </div>
        </div>

        <div className="productivity-stat">
          <span>🧠</span>

          <div>
            <p>DSA</p>
            <h2>5.2h</h2>
            <small>This week</small>
          </div>
        </div>

        <div className="productivity-stat">
          <span>💻</span>

          <div>
            <p>Development</p>
            <h2>8.5h</h2>
            <small>This week</small>
          </div>
        </div>

        <div className="productivity-stat">
          <span>🔥</span>

          <div>
            <p>Focus Streak</p>
            <h2>7 days</h2>
            <small>Current streak</small>
          </div>
        </div>

      </section>

      {/* Today's Focus */}

      <section className="productivity-section">

        <div className="section-title">

          <div>
            <span>🎯</span>

            <div>
              <h2>Today's Focus</h2>
              <p>Your daily learning activities</p>
            </div>
          </div>

          <span className="progress-label">
            {completedCount} / {activities.length}
          </span>

        </div>

        {/* Progress */}

        <div className="productivity-progress">

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>

          <span>{completionPercentage}%</span>

        </div>

        {/* Activities */}

        <div className="activity-list">

          {activities.map((activity) => (

            <div
              className={`activity ${
                activity.completed
                  ? "activity-completed"
                  : ""
              }`}
              key={activity.id}
            >

              <div className="activity-icon">
                {activity.icon}
              </div>

              <div className="activity-info">

                <h3>{activity.name}</h3>

                <p>{activity.target}</p>

              </div>

              <button
                className={`activity-check ${
                  activity.completed
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  toggleActivity(activity.id)
                }
              >
                {activity.completed ? "✓" : ""}
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* Focus Chart */}

      <section className="productivity-section">

        <div className="section-title">

          <div>
            <span>⏱️</span>

            <div>
              <h2>Focus Time</h2>
              <p>Your deep-work sessions this week</p>
            </div>
          </div>

        </div>

        <div className="focus-chart">

          {[
            ["Mon", "2.5h", "55%"],
            ["Tue", "3.2h", "75%"],
            ["Wed", "1.8h", "40%"],
            ["Thu", "4h", "90%"],
            ["Fri", "2.8h", "65%"],
            ["Sat", "2.2h", "50%"],
            ["Sun", "1.2h", "30%"],
          ].map(([day, hours, height]) => (

            <div className="focus-day" key={day}>

              <div
                className="focus-bar"
                style={{
                  height,
                }}
              />

              <span>{day}</span>

              <small>{hours}</small>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Productivity;