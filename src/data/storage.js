const STORAGE_KEY = "habitTrackerData";

const defaultData = {
  habits: [],
  habitLogs: [],
  activities: [],
  runs: [],
  strengthWorkouts: [],
  focusSessions: [],
  goals: [],
};

export function getData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return structuredClone(defaultData);
  }

  try {
    const parsedData = JSON.parse(savedData);

    return {
      ...defaultData,
      ...parsedData,
    };
  } catch (error) {
    console.error("Failed to load HabitTrack data:", error);
    return structuredClone(defaultData);
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ---------------- HABITS ---------------- */

export function addHabit(habit) {
  const data = getData();

  const newHabit = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...habit,
  };

  data.habits.push(newHabit);
  saveData(data);

  return newHabit;
}

export function deleteHabit(id) {
  const data = getData();

  data.habits = data.habits.filter((habit) => habit.id !== id);
  data.habitLogs = data.habitLogs.filter(
    (log) => log.habitId !== id
  );

  saveData(data);
}

/* ---------------- HABIT LOGS ---------------- */

export function addHabitLog(log) {
  const data = getData();

  const newLog = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...log,
  };

  data.habitLogs.push(newLog);
  saveData(data);

  return newLog;
}

/* ---------------- PRODUCTIVITY ACTIVITIES ---------------- */

export function addActivity(activity) {
  const data = getData();

  const newActivity = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...activity,
  };

  data.activities.push(newActivity);
  saveData(data);

  return newActivity;
}

export function deleteActivity(id) {
  const data = getData();

  data.activities = data.activities.filter(
    (activity) => activity.id !== id
  );

  saveData(data);
}

/* ---------------- RUNNING ---------------- */

export function addRun(run) {
  const data = getData();

  const newRun = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...run,
  };

  data.runs.push(newRun);
  saveData(data);

  return newRun;
}

export function deleteRun(id) {
  const data = getData();

  data.runs = data.runs.filter((run) => run.id !== id);

  saveData(data);
}

/* ---------------- STRENGTH ---------------- */

export function addStrengthWorkout(workout) {
  const data = getData();

  const newWorkout = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...workout,
  };

  data.strengthWorkouts.push(newWorkout);
  saveData(data);

  return newWorkout;
}

export function deleteStrengthWorkout(id) {
  const data = getData();

  data.strengthWorkouts = data.strengthWorkouts.filter(
    (workout) => workout.id !== id
  );

  saveData(data);
}

/* ---------------- FOCUS SESSIONS ---------------- */

export function addFocusSession(session) {
  const data = getData();

  const newSession = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...session,
  };

  data.focusSessions.push(newSession);
  saveData(data);

  return newSession;
}

/* ---------------- GOALS ---------------- */

export function addGoal(goal) {
  const data = getData();

  const newGoal = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...goal,
  };

  data.goals.push(newGoal);
  saveData(data);

  return newGoal;
}

export function deleteGoal(id) {
  const data = getData();

  data.goals = data.goals.filter((goal) => goal.id !== id);

  saveData(data);
}