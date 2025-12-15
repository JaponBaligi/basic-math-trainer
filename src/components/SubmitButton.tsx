import { useLanguage } from '../contexts/LanguageContext';

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
  const { t } = useLanguage();
  return (
    <button type="button" className="submit-button" onClick={onClick} disabled={disabled}>
      {t.submit}
    </button>
  );
}

