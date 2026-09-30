import "./Exercise.css";

function Exercise() {
  return (
    <div className="exercise-page">
      <div className="page-heading">
        <div>
          <p>Exercise</p>
          <h1>Train with purpose.</h1>
        </div>

        <button className="add-workout">
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
            <h3>35.0 km</h3>
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
            <h3>21.0 km</h3>
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
          <div className="mileage-row">
            <span>Mon</span>
            <div className="mileage-bar">
              <div style={{ width: "70%" }}></div>
            </div>
            <strong>5 km</strong>
          </div>

          <div className="mileage-row">
            <span>Tue</span>
            <div className="mileage-bar">
              <div style={{ width: "55%" }}></div>
            </div>
            <strong>4 km</strong>
          </div>

          <div className="mileage-row">
            <span>Wed</span>
            <div className="mileage-bar">
              <div style={{ width: "70%" }}></div>
            </div>
            <strong>5 km</strong>
          </div>

          <div className="mileage-row">
            <span>Thu</span>
            <div className="mileage-bar">
              <div style={{ width: "55%" }}></div>
            </div>
            <strong>4 km</strong>
          </div>

          <div className="mileage-row">
            <span>Fri</span>
            <div className="mileage-bar">
              <div style={{ width: "70%" }}></div>
            </div>
            <strong>5 km</strong>
          </div>

          <div className="mileage-row">
            <span>Sat</span>
            <div className="mileage-bar">
              <div style={{ width: "100%" }}></div>
            </div>
            <strong>10 km</strong>
          </div>
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
    </div>
  );
}

export default Exercise;