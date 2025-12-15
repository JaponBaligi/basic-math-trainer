interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
  return (
    <button type="button" className="submit-button" onClick={onClick} disabled={disabled}>
      Submit
    </button>
  );
}

