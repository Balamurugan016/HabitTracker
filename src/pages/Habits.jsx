import { useState, useEffect } from "react";
import { addHabit, addHabitLog, getData, deleteHabit, saveData } from "../data/storage";
import "./Habits.css";
import CustomSelect from "../components/CustomSelect";


function Habits() {
    const [habits, setHabits] = useState([]);
    const [showAddHabit, setShowAddHabit] = useState(false);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [frequency, setFrequency] = useState("");
    const [target, setTarget] = useState("");
    const [unit, setUnit] = useState("");
    const [color, setColor] = useState("#8b5cf6");
    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const [habitType, setHabitType] = useState("");
    const [editingHabit, setEditingHabit] = useState(null);

    useEffect(() => {
        const data = getData();
        setHabits(data.habits);
    }, []);


    const categoryOptions = [
        { value: "Fitness", label: "Fitness" },
        { value: "Health", label: "Health" },
        { value: "Learning", label: "Learning" },
        { value: "Productivity", label: "Productivity" },
        { value: "Personal", label: "Personal" },
        { value: "Finance", label: "Finance" },
        { value: "Mindfulness", label: "Mindfulness" },
        { value: "Other", label: "Other" },
    ];

    const unitOptions = [
        { value: "km", label: "Kilometers" },
        { value: "meters", label: "Meters" },
        { value: "minutes", label: "Minutes" },
        { value: "hours", label: "Hours" },
        { value: "pages", label: "Pages" },
        { value: "reps", label: "Reps" },
        { value: "steps", label: "Steps" },
        { value: "liters", label: "Liters" },
        { value: "glasses", label: "Glasses" },
        { value: "sessions", label: "Sessions" },
        { value: "times", label: "Times" },
    ];

    const frequencyOptions = [
        { value: "Daily", label: "Daily" },
        { value: "Weekdays", label: "Weekdays" },
        { value: "Weekends", label: "Weekends" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
    ];

    const resetForm = () => {
        setName("");
        setCategory("");
        setHabitType("");
        setFrequency("");
        setTarget("");
        setUnit("");
        setColor("#8b5cf6");
    };

    const habitTypeOptions = [
        { value: "Running", label: "Running" },
        { value: "Walking", label: "Walking" },
        { value: "Cycling", label: "Cycling" },
        { value: "Workout", label: "Workout" },
        { value: "Swimming", label: "Swimming" },
        { value: "Sports", label: "Sports" },
        { value: "Reading", label: "Reading" },
        { value: "Study", label: "Study" },
        { value: "Meditation", label: "Meditation" },
        { value: "Water", label: "Water" },
        { value: "Sleep", label: "Sleep" },
        { value: "Custom", label: "Custom" },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim()) {
            alert("Please enter a habit name.");
            return;
        }

        if (!category) {
            alert("Please select a category.");
            return;
        }

        if (!habitType) {
            alert("Please select a habit type.");
            return;
        }

        if (!frequency) {
            alert("Please select a frequency.");
            return;
        }

        if (editingHabit) {
            const data = getData();

            const updatedHabits = data.habits.map((habit) =>
                habit.id === editingHabit.id
                    ? {
                        ...habit,
                        name: name.trim(),
                        category,
                        habitType,
                        frequency,
                        target: target === "" ? null : Number(target),
                        unit,
                        color,
                    }
                    : habit
            );

            data.habits = updatedHabits;

            saveData(data);

            setHabits(updatedHabits);
        } else {
            const newHabit = addHabit({
                name: name.trim(),
                category,
                habitType,
                frequency,
                target: target === "" ? null : Number(target),
                unit,
                color,
            });

            setHabits((previousHabits) => [
                ...previousHabits,
                newHabit,
            ]);
        }

        resetForm();
        setEditingHabit(null);
        setShowAddHabit(false);
    };

    const handleClose = () => {
        resetForm();
        setEditingHabit(null);
        setShowAddHabit(false);
    };

    const getTodayDate = () => {
        const today = new Date();

        return `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;
    };


    const isHabitCompletedToday = (habitId) => {
        const data = getData();

        const today = new Date().toISOString().split("T")[0];

        return data.habitLogs.some(
            (log) =>
                log.habitId === habitId &&
                log.date === today
        );
    };



    const handleToggleHabit = (habit) => {
        const data = getData();

        const today = new Date().toISOString().split("T")[0];

        const existingLog = data.habitLogs.find(
            (log) =>
                log.habitId === habit.id &&
                log.date === today
        );

        if (existingLog) {
            data.habitLogs = data.habitLogs.filter(
                (log) => log.id !== existingLog.id
            );

            localStorage.setItem(
                "habitTrackerData",
                JSON.stringify(data)
            );
        } else {
            addHabitLog({
                habitId: habit.id,
                date: today,
                completed: true,
            });
        }

        setHabits((previousHabits) => [...previousHabits]);
    };
    const handleDeleteHabit = (habitId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this habit?"
        );

        if (!confirmed) {
            return;
        }

        deleteHabit(habitId);

        setHabits((previousHabits) =>
            previousHabits.filter(
                (habit) => habit.id !== habitId
            )
        );
    };

    const handleEditHabit = (habit) => {

        setEditingHabit(habit);

        setName(habit.name);
        setCategory(habit.category);
        setHabitType(habit.habitType);
        setFrequency(habit.frequency);
        setTarget(habit.target ?? "");
        setUnit(habit.unit ?? "");
        setColor(habit.color || "#8b5cf6");

        setShowAddHabit(true)

    };

    const getHabitStreak = (habitId) => {
        const data = getData();

        const completedDates = new Set(
            data.habitLogs
                .filter(
                    (log) =>
                        log.habitId === habitId &&
                        log.completed === true
                )
                .map((log) => log.date)
        );

        let streak = 0;
        const today = new Date();

        while (true) {
            const date = new Date(today);

            date.setDate(
                today.getDate() - streak
            );

            const dateString = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;

            if (!completedDates.has(dateString)) {
                break;
            }

            streak++;
        }

        return streak;
    };

    const getHabitCompletions = (habitId) => {
        const data = getData();

        return data.habitLogs.filter(
            (log) =>
                log.habitId === habitId &&
                log.completed === true
        ).length;
    };

    const getHabitCompletionRate = (habit) => {
        const data = getData();

        const completedCount = data.habitLogs.filter(
            (log) =>
                log.habitId === habit.id &&
                log.completed === true
        ).length;

        if (completedCount === 0) {
            return 0;
        }

        const createdDate = new Date(habit.createdAt);
        const today = new Date();

        createdDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        let expectedCount = 0;
        const currentDate = new Date(createdDate);

        while (currentDate <= today) {
            const day = currentDate.getDay();

            if (habit.frequency === "Daily") {
                expectedCount++;
            }

            if (
                habit.frequency === "Weekdays" &&
                day >= 1 &&
                day <= 5
            ) {
                expectedCount++;
            }

            if (
                habit.frequency === "Weekends" &&
                (day === 0 || day === 6)
            ) {
                expectedCount++;
            }

            if (habit.frequency === "Weekly") {
                if (day === createdDate.getDay()) {
                    expectedCount++;
                }
            }

            if (
                habit.frequency === "Monthly" &&
                currentDate.getDate() === createdDate.getDate()
            ) {
                expectedCount++;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (expectedCount === 0) {
            return 0;
        }

        return Math.min(
            100,
            Math.round((completedCount / expectedCount) * 100)
        );
    };
    const getHabitHistory = (habit) => {
        const data = getData();

        const completedDates = new Set(
            data.habitLogs
                .filter(
                    (log) =>
                        log.habitId === habit.id &&
                        log.completed === true
                )
                .map((log) => log.date)
        );

        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth();

        const daysInMonth = new Date(
            year,
            month + 1,
            0
        ).getDate();

        const history = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);

            const dayOfWeek = date.getDay();

            let expected = false;

            if (habit.frequency === "Daily") {
                expected = true;
            }

            if (
                habit.frequency === "Weekdays" &&
                dayOfWeek >= 1 &&
                dayOfWeek <= 5
            ) {
                expected = true;
            }

            if (
                habit.frequency === "Weekends" &&
                (dayOfWeek === 0 || dayOfWeek === 6)
            ) {
                expected = true;
            }

            if (habit.frequency === "Weekly") {
                const createdDate = new Date(habit.createdAt);

                if (dayOfWeek === createdDate.getDay()) {
                    expected = true;
                }
            }

            if (habit.frequency === "Monthly") {
                const createdDate = new Date(habit.createdAt);

                if (day === createdDate.getDate()) {
                    expected = true;
                }
            }

            history.push({
                date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
                    day
                ).padStart(2, "0")}`,
                completed: completedDates.has(
                    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                ),
                expected,
                day,
            });
        }

        return history;
    };

    return (
        <div className="habits-page">

            {/* Header */}
            <div className="habits-header">
                <div>
                    <p className="page-label">HABITS</p>

                    <h1>Build consistency.</h1>

                    <p className="page-description">
                        Create habits and stay consistent with the things
                        that matter to you.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-habit-button"
                    onClick={() => setShowAddHabit(true)}
                >
                    + Add Habit
                </button>
            </div>


            {/* Habits */}
            <section className="habits-section">

                <div className="section-heading">
                    <div>
                        <h2>My Habits</h2>

                        <p>
                            {habits.length === 0
                                ? "Start by creating your first habit."
                                : `${habits.length} ${habits.length === 1
                                    ? "habit"
                                    : "habits"
                                }`}
                        </p>
                    </div>
                </div>


                {/* Empty state */}
                {habits.length === 0 ? (
                    <div className="empty-habits">

                        <div
                            className="empty-habit-icon"
                            onClick={() => setShowAddHabit(true)}
                        >
                            +
                        </div>

                        <h3>No habits yet</h3>

                        <p>
                            Create your first habit to start building
                            consistency.
                        </p>

                        <button
                            type="button"
                            className="empty-habit-button"
                            onClick={() => setShowAddHabit(true)}
                        >
                            Create Habit
                        </button>

                    </div>
                ) : (

                    <div className="habits-grid">

                        {habits.map((habit) => (
                            <div
                                className="habit-card"
                                key={habit.id}
                            >

                                <div
                                    className="habit-card-accent"
                                    style={{
                                        backgroundColor: habit.color,
                                    }}
                                />

                                <div className="habit-card-content">

                                    <div className="habit-card-top">

                                        <div>
                                            <h3>{habit.name}</h3>

                                            <div className="habit-card-tags">
                                                {habit.category && (
                                                    <span className="habit-category">
                                                        {habit.category}
                                                    </span>
                                                )}

                                                {habit.habitType && (
                                                    <span className="habit-type">
                                                        {habit.habitType}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="habit-card-actions">

                                            <button
                                                type="button"
                                                className={`habit-complete-button ${isHabitCompletedToday(habit.id)
                                                    ? "completed"
                                                    : ""
                                                    }`}
                                                onClick={() => handleToggleHabit(habit)}
                                                aria-label={
                                                    isHabitCompletedToday(habit.id)
                                                        ? "Mark habit incomplete"
                                                        : "Mark habit complete"
                                                }
                                            >
                                                {isHabitCompletedToday(habit.id) ? "✓" : ""}
                                            </button>

                                            <button
                                                type="button"
                                                className="habit-edit-button"
                                                onClick={() => handleEditHabit(habit)}
                                                aria-label="Edit habit"
                                            >
                                                ✎
                                            </button>

                                            <button
                                                type="button"
                                                className="habit-delete-button"
                                                onClick={() => handleDeleteHabit(habit.id)}
                                                aria-label="Remove habit"
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </div>


                                    <div className="habit-card-details">

                                        <div>
                                            <span>Frequency</span>
                                            <strong>{habit.frequency}</strong>
                                        </div>

                                        <div>
                                            <span>Target</span>
                                            <strong>
                                                {habit.target !== null
                                                    ? `${habit.target} ${habit.unit || ""}`
                                                    : "No target"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Streak</span>
                                            <strong>
                                                🔥 {getHabitStreak(habit.id)} days
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Completions</span>
                                            <strong>
                                                {getHabitCompletions(habit.id)}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Completion Rate</span>
                                            <strong>{getHabitCompletionRate(habit)}%</strong>
                                        </div>

                                    </div>

                                    <div className="habit-history">
                                        <div className="habit-history-header">
                                            <span>
                                                {new Date().toLocaleString("default", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="habit-history-grid">
                                            {getHabitHistory(habit).map((day) => (
                                                <div
                                                    key={day.date}
                                                    className={`habit-history-day ${day.completed ? "completed" : ""
                                                        }`}
                                                    title={day.date}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                )}

            </section>


            {/* Add Habit Modal */}
            {showAddHabit && (
                <div
                    className="habit-modal-overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            handleClose();
                        }
                    }}
                >

                    <div className="habit-modal">

                        <div className="habit-modal-header">

                            <div>
                                <h2>{editingHabit ? "Edit Habit" : "Add New Habit"}</h2>

                                <p>
                                    Create a habit you want to track.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="habit-modal-close"
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="habit-form"
                            onSubmit={handleSubmit}
                        >

                            {/* Category */}
                            <CustomSelect
                                label="Category"
                                value={category}
                                placeholder="Select category"
                                options={categoryOptions}
                                onChange={setCategory}
                            />

                            <CustomSelect
                                label="Habit Type"
                                value={habitType}
                                placeholder="Select habit type"
                                options={habitTypeOptions}
                                onChange={setHabitType}
                            />

                            <CustomSelect
                                label="Frequency"
                                value={frequency}
                                placeholder="Select frequency"
                                options={frequencyOptions}
                                onChange={setFrequency}
                            />


                            <div className="habit-form-row">

                                {/* TARGET */}
                                <div className="habit-form-group">

                                    <label htmlFor="habit-target">
                                        Target
                                    </label>

                                    <input
                                        id="habit-target"
                                        type="number"
                                        min="0"
                                        value={target}
                                        onChange={(event) =>
                                            setTarget(event.target.value)
                                        }
                                        placeholder="e.g. 5"
                                    />

                                </div>

                                <div className="habit-form-group">
                                    <label htmlFor="habit-name">
                                        Habit Name
                                    </label>

                                    <input
                                        id="habit-name"
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="e.g. Morning Run"
                                    />
                                </div>

                                {/* UNIT */}
                                <CustomSelect
                                    label="Unit"
                                    value={unit}
                                    placeholder="Select unit"
                                    options={unitOptions}
                                    onChange={setUnit}
                                />

                            </div>


                            {/* Color */}
                            <div className="habit-form-group">
                                <label>Color</label>

                                <div className="habit-custom-select">

                                    <button
                                        type="button"
                                        className="habit-color-trigger"
                                        onClick={() =>
                                            setShowColorDropdown((previous) => !previous)
                                        }
                                    >
                                        <span
                                            className="habit-color-dot"
                                            style={{ backgroundColor: color }}
                                        />

                                        <span className="habit-color-selected-name">
                                            {{
                                                "#8B5CF6": "Purple",
                                                "#6366F1": "Indigo",
                                                "#3B82F6": "Blue",
                                                "#06B6D4": "Cyan",
                                                "#22C55E": "Green",
                                                "#84CC16": "Lime",
                                                "#EAB308": "Amber",
                                                "#F97316": "Orange",
                                                "#EF4444": "Red",
                                                "#EC4899": "Pink",
                                                "#F43F5E": "Rose",
                                                "#D946EF": "Violet",
                                            }[color]}
                                        </span>

                                        <span className="habit-select-arrow">
                                            {showColorDropdown ? "▲" : "▼"}
                                        </span>
                                    </button>


                                    {showColorDropdown && (
                                        <div className="habit-color-dropdown">

                                            {[
                                                { name: "Purple", value: "#8B5CF6" },
                                                { name: "Indigo", value: "#6366F1" },
                                                { name: "Blue", value: "#3B82F6" },
                                                { name: "Cyan", value: "#06B6D4" },
                                                { name: "Green", value: "#22C55E" },
                                                { name: "Lime", value: "#84CC16" },
                                                { name: "Amber", value: "#EAB308" },
                                                { name: "Orange", value: "#F97316" },
                                                { name: "Red", value: "#EF4444" },
                                                { name: "Pink", value: "#EC4899" },
                                                { name: "Rose", value: "#F43F5E" },
                                                { name: "Violet", value: "#D946EF" },
                                            ].map((colorOption) => (
                                                <button
                                                    key={colorOption.value}
                                                    type="button"
                                                    className={
                                                        color === colorOption.value
                                                            ? "habit-color-option active"
                                                            : "habit-color-option"
                                                    }
                                                    onClick={() => {
                                                        setColor(colorOption.value);
                                                        setShowColorDropdown(false);
                                                    }}
                                                >
                                                    <span
                                                        className="habit-color-dot"
                                                        style={{
                                                            backgroundColor: colorOption.value,
                                                        }}
                                                    />

                                                    <span>{colorOption.name}</span>

                                                    {color === colorOption.value && (
                                                        <span className="habit-color-check">
                                                            ✓
                                                        </span>
                                                    )}
                                                </button>
                                            ))}

                                        </div>
                                    )}

                                </div>
                            </div>


                            {/* Actions */}
                            <div className="habit-modal-actions">

                                <button
                                    type="button"
                                    className="habit-cancel-button"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="habit-create-button"
                                >
                                    {editingHabit ? "Save Changes" : "Create Habit"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Habits;