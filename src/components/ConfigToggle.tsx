import { useLanguage } from '../contexts/LanguageContext';

interface ConfigToggleProps {
  allowTwoDigitOperations: boolean;
  onToggle: (value: boolean) => void;
}

export function ConfigToggle({ allowTwoDigitOperations, onToggle }: ConfigToggleProps) {
  const { t } = useLanguage();
  const handleClick = () => {
    onToggle(!allowTwoDigitOperations);
  };

  return (
    <button
      type="button"
      className={`config-toggle-button ${allowTwoDigitOperations ? 'active' : ''}`}
      onClick={handleClick}
    >
      {t.enableTwoDigitOperations}
    </button>
  );
}

