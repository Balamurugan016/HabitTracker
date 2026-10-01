import { useState } from "react";
import AddActivity from "../components/AddActivity";
import FocusTimer from "../components/FocusTimer";
import { getData, deleteActivity } from "../data/storage";
import "./Productivity.css";

function Productivity() {
  const [activities, setActivities] = useState(() => {
    return getData().activities;
  });

  const [showAddActivity, setShowAddActivity] = useState(false);

  const handleActivityAdded = (newActivity) => {
    setActivities((previousActivities) => [
      ...previousActivities,
      newActivity,
    ]);
  };

  const handleDeleteActivity = (id) => {
    deleteActivity(id);

    setActivities((previousActivities) =>
      previousActivities.filter(
        (activity) => activity.id !== id
      )
    );
  };

  return (
    <div className="productivity-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="productivity-header">
        <div>
          <p className="page-label">PRODUCTIVITY</p>

          <h1>Build better habits.</h1>

          <p className="page-description">
            Create activities and track focused work.
          </p>
        </div>

        <button
          type="button"
          className="add-activity-button"
          onClick={() => setShowAddActivity(true)}
        >
          + Add Activity
        </button>
      </div>


      {/* =========================================
          FOCUS TIMER
      ========================================= */}

      <section className="productivity-section focus-section">

        <div className="section-title">
          <div>
            <span>◷</span>

            <div>
              <h2>Focus Timer</h2>

              <p>
                Work on one activity without distractions.
              </p>
            </div>
          </div>
        </div>

        <FocusTimer />

      </section>


      {/* =========================================
          MY ACTIVITIES
      ========================================= */}

      <section className="activities-section">

        <div className="section-heading">
          <div>
            <h2>My Activities</h2>

            <p>
              {activities.length === 0
                ? "You haven't created any activities yet."
                : `${activities.length} ${
                    activities.length === 1
                      ? "activity"
                      : "activities"
                  }`}
            </p>
          </div>
        </div>


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {activities.length === 0 ? (
          <div className="empty-activities">

            <button
              type="button"
              className="empty-icon"
              onClick={() => setShowAddActivity(true)}
              aria-label="Create activity"
            >
              +
            </button>

            <h3>No activities yet</h3>

            <p>
              Create your first productivity activity
              to start tracking your progress.
            </p>

            <button
              type="button"
              className="empty-add-button"
              onClick={() => setShowAddActivity(true)}
            >
              Create Activity
            </button>

          </div>
        ) : (

          /* =====================================
             ACTIVITY CARDS
          ===================================== */

          <div className="activities-grid">

            {activities.map((activity) => (
              <div
                className="activity-card"
                key={activity.id}
              >

                <div
                  className="activity-color"
                  style={{
                    backgroundColor:
                      activity.color,
                  }}
                />

                <div className="activity-card-content">

                  <div className="activity-card-top">

                    <div>
                      <h3>{activity.name}</h3>

                      {activity.category && (
                        <span className="activity-category">
                          {activity.category}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="delete-activity-button"
                      onClick={() =>
                        handleDeleteActivity(
                          activity.id
                        )
                      }
                      aria-label={`Delete ${activity.name}`}
                    >
                      ×
                    </button>

                  </div>

                  <div className="activity-target">

                    <span>Target</span>

                    <strong>
                      {activity.target !== null
                        ? `${activity.target} ${
                            activity.unit || ""
                          }`
                        : "No target"}
                    </strong>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>


      {/* =========================================
          ADD ACTIVITY MODAL
      ========================================= */}

      {showAddActivity && (
        <AddActivity
          onClose={() =>
            setShowAddActivity(false)
          }
          onActivityAdded={
            handleActivityAdded
          }
        />
      )}

    </div>
  );
}

export default Productivity;