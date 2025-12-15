interface ConfigToggleProps {
  allowTwoDigitOperations: boolean;
  onToggle: (value: boolean) => void;
}

export function ConfigToggle({ allowTwoDigitOperations, onToggle }: ConfigToggleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    <label className="config-toggle">
      <input
        type="checkbox"
        checked={allowTwoDigitOperations}
        onChange={handleChange}
        className="config-checkbox"
      />
      <span className="config-label">Enable two-digit operations</span>
    </label>
  );
}

