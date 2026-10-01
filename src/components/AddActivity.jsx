import { useState } from "react";
import { addActivity } from "../data/storage";

function AddActivity({ onClose, onActivityAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [color, setColor] = useState("#8b5cf6");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const newActivity = addActivity({
      name: name.trim(),
      category: category.trim(),
      target: target ? Number(target) : null,
      unit: unit.trim(),
      color,
    });

    onActivityAdded(newActivity);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="activity-modal">
        <div className="modal-header">
          <div>
            <h2>Add Activity</h2>
            <p>Create your own productivity activity.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Activity name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. DSA Practice"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. Learning"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Target</label>

              <input
                type="number"
                min="0"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
                placeholder="e.g. 60"
              />
            </div>

            <div className="form-group">
              <label>Unit</label>

              <input
                type="text"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                placeholder="minutes"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>

            <div className="color-input">
              <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />

              <span>{color}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-button"
            >
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivity;