interface NextButtonProps {
  onClick: () => void;
}

export function NextButton({ onClick }: NextButtonProps) {
  return (
    <button type="button" className="next-button" onClick={onClick}>
      Next Question
    </button>
  );
}

