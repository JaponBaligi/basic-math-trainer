import type { Question } from '../types';
import { formatOperation } from '../utils/formatOperation';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const operationSymbol = formatOperation(question.operation);
  
  return (
    <div className="question-display">
      <div className="question-text">
        {question.operand1} {operationSymbol} {question.operand2} = ?
      </div>
    </div>
  );
}

