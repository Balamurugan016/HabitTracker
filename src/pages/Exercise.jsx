import "./Exercise.css";
import AddRun from "../components/AddRun";
import { useState } from "react";
import WorkoutTypeModal from "../components/WorkoutTypeModal";
import { getData } from "../data/storage";

function Exercise() {
  const [showAddRun, setShowAddRun] = useState(false);
  const [showWorkoutTypes, setShowWorkoutTypes] = useState(false);
  const [runs, setRuns] = useState(() => getData().runs);

  console.log("showAddRun:", showAddRun);
  console.log("showWorkoutTypes:", showWorkoutTypes);

  const totalDistance = runs.reduce(
    (total, run) => total + Number(run.distance || 0),
    0
  );

  const longestRun = runs.reduce(
    (longest, run) =>
      Math.max(longest, Number(run.distance || 0)),
    0
  );

  const today = new Date();

  const startOfWeek = new Date(today);
  const day = startOfWeek.getDay();

  const difference = day === 0 ? 6 : day - 1;

  startOfWeek.setDate(startOfWeek.getDate() - difference);
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyDistance = runs.reduce((total, run) => {
    const runDate = new Date(`${run.date}T00:00:00`);

    if (runDate >= startOfWeek && runDate <= today) {
      return total + Number(run.distance || 0);
    }

    return total;
  }, 0);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weeklyMileage = weekDays.map((dayName, index) => {
    const date = new Date(startOfWeek);

    date.setDate(startOfWeek.getDate() + index);

    const dateString =
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const distance = runs
      .filter((run) => run.date === dateString)
      .reduce(
        (total, run) => total + Number(run.distance || 0),
        0
      );

    return {
      day: dayName,
      distance,
    };
  });




  return (
    <div className="exercise-page">
      <div className="page-heading">
        <div>
          <p>Exercise</p>
          <h1>Train with purpose.</h1>
        </div>

        <button
          className="add-workout"
          onClick={() => setShowWorkoutTypes(true)}
        >
          + Add Workout
        </button>
      </div>

      {/* Running Overview */}
      <section className="exercise-section">
        <div className="section-title">
          <div>
            <span>🏃</span>
            <div>
              <h2>Running</h2>
              <p>Your running performance</p>
            </div>
          </div>
        </div>

        <div className="exercise-stats">
          <div className="exercise-stat">
            <p>This Week</p>
            <h3>{weeklyDistance.toFixed(1)} km</h3>
            <span>Weekly distance</span>
          </div>

          <div className="exercise-stat">
            <p>5K PR</p>
            <h3>27:13</h3>
            <span>Personal best</span>
          </div>

          <div className="exercise-stat">
            <p>10K PR</p>
            <h3>58:35</h3>
            <span>Personal best</span>
          </div>

          <div className="exercise-stat">
            <p>Longest Run</p>
            <h3>{longestRun.toFixed(1)} km</h3>
            <span>Distance</span>
          </div>
        </div>
      </section>

      {/* Weekly Running */}
      <section className="exercise-section">
        <div className="section-title">
          <div>
            <span>📊</span>
            <div>
              <h2>Weekly Mileage</h2>
              <p>Track your running volume</p>
            </div>
          </div>
        </div>

        <div className="mileage">
          {weeklyMileage.map((item) => {
            const maxDistance = Math.max(
              ...weeklyMileage.map((day) => day.distance),
              1
            );

            const width =
              item.distance > 0
                ? `${(item.distance / maxDistance) * 100}%`
                : "0%";

            return (
              <div
                className="mileage-row"
                key={item.day}
              >
                <span>{item.day}</span>

                <div className="mileage-bar">
                  <div style={{ width }} />
                </div>

                <strong>
                  {item.distance > 0
                    ? `${item.distance.toFixed(1)} km`
                    : "—"}
                </strong>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strength */}
      <section className="exercise-section">
        <div className="section-title">
          <div>
            <span>💪</span>
            <div>
              <h2>Strength Training</h2>
              <p>Build muscle and track progression</p>
            </div>
          </div>
        </div>

        <div className="strength-grid">
          <div className="strength-card">
            <span>🦵</span>
            <h3>Bulgarian Split Squat</h3>
            <p>3 × 8–12 each leg</p>
            <small>Bodyweight / 5 kg</small>
          </div>

          <div className="strength-card">
            <span>💪</span>
            <h3>Push-ups</h3>
            <p>3 × 10–20</p>
            <small>Current max: 20</small>
          </div>

          <div className="strength-card">
            <span>🏋️</span>
            <h3>Pull-ups</h3>
            <p>3 × 3–5</p>
            <small>Current max: 5</small>
          </div>

          <div className="strength-card">
            <span>🔥</span>
            <h3>Core</h3>
            <p>3 × 30–45 sec</p>
            <small>Progress weekly</small>
          </div>
        </div>
      </section>
      {showAddRun && (
        <AddRun
          onClose={() => setShowAddRun(false)}
          onSaved={(newRun) => {
            setRuns(getData().runs);
          }}
        />
      )}

      {showWorkoutTypes && (
        <WorkoutTypeModal
          onClose={() => setShowWorkoutTypes(false)}
          onSelect={(type) => {
            console.log("Selected workout:", type);
            if (type === "running") {
              console.log("Opening Add Run");
              setShowWorkoutTypes(false);
              setShowAddRun(true);
            }
          }}
        />
      )}
    </div>
  );
}

export default Exercise;