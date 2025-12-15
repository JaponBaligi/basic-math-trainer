import type { DifficultyLevel } from '../types';

interface DifficultySelectorProps {
  difficultyLevel: DifficultyLevel;
  onSelect: (level: DifficultyLevel) => void;
}

const DIFFICULTY_OPTIONS: DifficultyLevel[] = ['EASY', 'MEDIUM', 'HARD', 'MIXED'];

export function DifficultySelector({ difficultyLevel, onSelect }: DifficultySelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value as DifficultyLevel);
  };

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty-select" className="difficulty-label">
        Difficulty:
      </label>
      <select
        id="difficulty-select"
        className="difficulty-select"
        value={difficultyLevel}
        onChange={handleChange}
      >
        {DIFFICULTY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

