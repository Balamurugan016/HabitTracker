import { useState } from "react";
import { addRun } from "../data/storage";
import CustomSelect from "./CustomSelect"

function AddRun({ onClose, onSaved }) {
    console.log("🔥 AddRun component rendered");
    const [date, setDate] = useState(() => {
        const today = new Date();

        return `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;
    });

    const [distance, setDistance] = useState("");
    const [runType, setRunType] = useState("Easy Run");
    const [notes, setNotes] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!distance || Number(distance) <= 0) {
            alert("Please enter a valid distance.");
            return;
        }

        const durationSeconds =
            (Number(hours) || 0) * 3600 +
            (Number(minutes) || 0) * 60 +
            (Number(seconds) || 0);

        if (durationSeconds <= 0) {
            alert("Please enter a valid duration.");
            return;
        }

        const newRun = addRun({
            date,
            distance: Number(distance),
            duration: durationSeconds,
            runType,
            notes: notes.trim(),

            // Reserved for future GPS recording
            route: [],

            // Reserved for future best-effort calculations
            efforts: {},
        });

        onSaved?.(newRun);
        onClose();
    };

    return (
        <div className="run-modal-overlay">
            <div className="run-modal">

                <div className="run-modal-header">
                    <div>
                        <span>RUNNING</span>
                        <h2>Add Run</h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="run-modal-close"
                    >
                        ×
                    </button>
                </div>

                <form
                    className="run-form"
                    onSubmit={handleSubmit}
                >

                    <div className="run-form-field">
                        <label>Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(event) =>
                                setDate(event.target.value)
                            }
                        />
                    </div>

                    <div className="run-form-row">

                        <div className="run-form-field">
                            <label>Distance</label>

                            <div className="run-input-with-unit">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="5.00"
                                    value={distance}
                                    onChange={(event) =>
                                        setDistance(event.target.value)
                                    }
                                />

                                <span>km</span>
                            </div>
                        </div>

                        <div className="run-form-field">
                            <label>Duration</label>

                            <div className="run-duration-inputs">

                                <div className="run-input-with-unit">
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        placeholder="00"
                                        value={hours}
                                        onChange={(event) =>
                                            setHours(event.target.value)
                                        }
                                    />
                                    <span>hr</span>
                                </div>

                                <div className="run-input-with-unit">
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        placeholder="30"
                                        value={minutes}
                                        onChange={(event) =>
                                            setMinutes(event.target.value)
                                        }
                                    />
                                    <span>min</span>
                                </div>

                                <div className="run-input-with-unit">
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        placeholder="00"
                                        value={seconds}
                                        onChange={(event) =>
                                            setSeconds(event.target.value)
                                        }
                                    />
                                    <span>sec</span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <CustomSelect
                        label="Run Type"
                        value={runType}
                        onChange={setRunType}
                        options={[
                            { value: "Easy Run", label: "Easy Run" },
                            { value: "Tempo Run", label: "Tempo Run" },
                            { value: "Long Run", label: "Long Run" },
                            { value: "Interval Run", label: "Interval Run" },
                            { value: "Recovery Run", label: "Recovery Run" },
                            { value: "Race", label: "Race" },
                            { value: "Other", label: "Other" },
                        ]}
                    />

                    <div className="run-form-field">
                        <label>Notes</label>

                        <textarea
                            rows="4"
                            placeholder="How did the run feel?"
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                        />
                    </div>

                    <div className="run-modal-actions">

                        <button
                            type="button"
                            onClick={onClose}
                            className="run-cancel-button"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="run-save-button"
                        >
                            Save Run
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddRun;