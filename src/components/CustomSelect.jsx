import { useState } from "react";

function CustomSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-group">
      <label>{label}</label>

      <div className="custom-select">

        {/* Selected value */}
        <button
          type="button"
          className="custom-select-trigger"
          onClick={() =>
            setIsOpen((previous) => !previous)
          }
        >
          <span
            className={
              selectedOption
                ? "custom-select-value"
                : "custom-select-placeholder"
            }
          >
            {selectedOption
              ? selectedOption.label
              : placeholder}
          </span>

          <span className="custom-select-arrow">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-select-menu">

            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={
                  option.value === value
                    ? "custom-select-option active"
                    : "custom-select-option"
                }
                onClick={() =>
                  handleSelect(option)
                }
              >
                <span>{option.label}</span>

                {option.value === value && (
                  <span className="custom-select-check">
                    ✓
                  </span>
                )}
              </button>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default CustomSelect;