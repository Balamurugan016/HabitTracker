function WorkoutTypeModal({ onClose, onSelect }) {
  const workoutTypes = [
    {
      type: "running",
      icon: "🏃",
      name: "Running",
      description: "Track distance, pace and efforts",
    },
    {
      type: "strength",
      icon: "💪",
      name: "Strength Training",
      description: "Track exercises, sets, reps and weight",
    },
    {
      type: "cycling",
      icon: "🚴",
      name: "Cycling",
      description: "Track cycling workouts",
    },
    {
      type: "walking",
      icon: "🚶",
      name: "Walking",
      description: "Track walking activity",
    },
    {
      type: "other",
      icon: "🏸",
      name: "Other",
      description: "Track another type of workout",
    },
  ];

  return (
    <div className="workout-type-overlay">
      <div className="workout-type-modal">

        <div className="workout-type-header">
          <div>
            <span>EXERCISE</span>
            <h2>Add Workout</h2>
          </div>

          <button
            type="button"
            className="workout-type-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="workout-type-subtitle">
          What did you do?
        </p>

        <div className="workout-type-list">
          {workoutTypes.map((workout) => (
            <button
              key={workout.type}
              type="button"
              className="workout-type-option"
              onClick={() => onSelect(workout.type)}
            >
              <span className="workout-type-icon">
                {workout.icon}
              </span>

              <span className="workout-type-info">
                <strong>{workout.name}</strong>
                <small>{workout.description}</small>
              </span>

              <span className="workout-type-arrow">
                →
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default WorkoutTypeModal;