interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function AnswerInput({ value, onChange, onSubmit, disabled }: AnswerInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^-?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      className="answer-input"
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      placeholder="Enter answer"
      autoFocus
    />
  );
}

