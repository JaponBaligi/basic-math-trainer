import type { DifficultyLevel } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DifficultySelectorProps {
  difficultyLevel: DifficultyLevel;
  onSelect: (level: DifficultyLevel) => void;
}

const DIFFICULTY_OPTIONS: DifficultyLevel[] = ['EASY', 'MEDIUM', 'HARD', 'MIXED'];

const getDifficultyLabel = (level: DifficultyLevel, t: ReturnType<typeof import('../utils/translations').getTranslations>): string => {
  switch (level) {
    case 'EASY':
      return t.easy;
    case 'MEDIUM':
      return t.medium;
    case 'HARD':
      return t.hard;
    case 'MIXED':
      return t.mixed;
    default:
      return level;
  }
};

export function DifficultySelector({ difficultyLevel, onSelect }: DifficultySelectorProps) {
  const { t } = useLanguage();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value as DifficultyLevel);
  };

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty-select" className="difficulty-label">
        {t.difficulty}
      </label>
      <select
        id="difficulty-select"
        className="difficulty-select"
        value={difficultyLevel}
        onChange={handleChange}
      >
        {DIFFICULTY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {getDifficultyLabel(option, t)}
          </option>
        ))}
      </select>
    </div>
  );
}

