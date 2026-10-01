import { useEffect, useMemo, useState } from "react";
import {
  addFocusSession,
  getData,
} from "../data/storage";

const DEFAULT_DURATION = 25 * 60;

function FocusTimer() {
  const [activities, setActivities] = useState(() => {
    return getData().activities;
  });

  const [selectedActivity, setSelectedActivity] = useState("");

  const [duration, setDuration] = useState(25);

  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATION);

  const [isRunning, setIsRunning] = useState(false);

  const [completedSessions, setCompletedSessions] = useState(() => {
    return Number(
      localStorage.getItem("focusSessionsCount")
    ) || 0;
  });

  /*
   * Reload activities whenever the timer component is opened.
   */
  useEffect(() => {
    setActivities(getData().activities);
  }, []);

  /*
   * Timer
   */
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(interval);

          setIsRunning(false);

          const newCount = completedSessions + 1;

          setCompletedSessions(newCount);

          localStorage.setItem(
            "focusSessionsCount",
            newCount
          );

          addFocusSession({
            activityId: selectedActivity || null,
            activity:
              activities.find(
                (item) => item.id === selectedActivity
              )?.name || "General Focus",
            duration,
            completedAt: new Date().toISOString(),
          });

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    duration,
    selectedActivity,
    activities,
    completedSessions,
  ]);

  /*
   * Change timer duration
   */
  const changeDuration = (minutes) => {
    if (isRunning) return;

    setDuration(minutes);
    setTimeLeft(minutes * 60);
  };

  /*
   * Start / pause
   */
  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  /*
   * Reset
   */
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  /*
   * Timer calculations
   */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const totalSeconds = duration * 60;

  const progress = useMemo(() => {
    if (totalSeconds === 0) {
      return 0;
    }

    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  }, [timeLeft, totalSeconds]);

  const currentActivity = activities.find(
    (activity) => activity.id === selectedActivity
  );

  return (
    <div className="focus-timer-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="focus-timer-header">
        <div>
          <span className="focus-timer-eyebrow">
            FOCUS SESSION
          </span>

          <h2>Deep Work Timer</h2>

          <p>
            Stay focused on one activity and make
            measurable progress.
          </p>
        </div>

        <div className="focus-session-counter">
          <span>Completed</span>

          <strong>{completedSessions}</strong>

          <small>sessions</small>
        </div>
      </div>


      {/* =================================================
          ACTIVITY SELECTION
      ================================================= */}

      <div className="focus-activity-panel">

        <div className="focus-field">

          <label htmlFor="focus-activity">
            Activity
          </label>

          {activities.length > 0 ? (
            <select
              id="focus-activity"
              value={selectedActivity}
              onChange={(event) =>
                setSelectedActivity(event.target.value)
              }
              disabled={isRunning}
            >
              <option value="">
                Select an activity
              </option>

              {activities.map((activity) => (
                <option
                  key={activity.id}
                  value={activity.id}
                >
                  {activity.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="no-focus-activity">
              <span>No activities created yet.</span>

              <small>
                Create an activity first to track
                focused work.
              </small>
            </div>
          )}

        </div>


        {/* Duration */}

        <div className="focus-field">

          <label>Session length</label>

          <div className="duration-options">

            {[15, 25, 45, 60].map((minutes) => (
              <button
                key={minutes}
                type="button"
                className={
                  duration === minutes
                    ? "duration-option active"
                    : "duration-option"
                }
                onClick={() =>
                  changeDuration(minutes)
                }
                disabled={isRunning}
              >
                {minutes}m
              </button>
            ))}

          </div>

        </div>

      </div>


      {/* =================================================
          TIMER
      ================================================= */}

      <div className="real-timer">

        {/* Progress ring */}

        <div
          className="timer-progress-ring"
          style={{
            "--progress": `${progress * 3.6}deg`,
          }}
        >
          <div className="timer-inner">

            <span className="timer-state">
              {timeLeft === 0
                ? "COMPLETED"
                : isRunning
                ? "FOCUSING"
                : "READY"}
            </span>

            <div className="timer-time">
              {String(minutes).padStart(2, "0")}
              <span>:</span>
              {String(seconds).padStart(2, "0")}
            </div>

            <span className="timer-activity-name">
              {currentActivity?.name ||
                "Choose an activity"}
            </span>

          </div>
        </div>


        {/* Timer status */}

        <div className="timer-status">

          <div>
            <span>Session</span>
            <strong>{duration} min</strong>
          </div>

          <div>
            <span>Remaining</span>
            <strong>
              {minutes}m {seconds}s
            </strong>
          </div>

        </div>


        {/* Controls */}

        <div className="timer-actions">

          {!isRunning ? (
            <button
              type="button"
              className="timer-main-button"
              onClick={handleStart}
            >
              ▶ Start Focus
            </button>
          ) : (
            <button
              type="button"
              className="timer-main-button pause"
              onClick={handlePause}
            >
              ⏸ Pause
            </button>
          )}

          <button
            type="button"
            className="timer-reset-button"
            onClick={handleReset}
          >
            ↻ Reset
          </button>

        </div>

      </div>

    </div>
  );
}

export default FocusTimer;