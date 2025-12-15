import { useLanguage } from '../contexts/LanguageContext';

interface NextButtonProps {
  onClick: () => void;
}

export function NextButton({ onClick }: NextButtonProps) {
  const { t } = useLanguage();
  return (
    <button type="button" className="next-button" onClick={onClick}>
      {t.nextQuestion}
    </button>
  );
}

