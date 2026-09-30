function HabitCard({ habit, onToggle }) {
  return (
    <div className="habit">
      <div>
        <strong>
          {habit.icon} {habit.name}
        </strong>

        <p>{habit.target}</p>
      </div>

      <button
        className={habit.completed ? "completed" : ""}
        onClick={() => onToggle(habit.id)}
      >
        {habit.completed ? "✓" : ""}
      </button>
    </div>
  );
}

export default HabitCard;