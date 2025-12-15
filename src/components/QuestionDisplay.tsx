import type { Question } from '../types';
import { formatOperation } from '../utils/formatOperation';
import { getOperationColor } from '../utils/operationColors';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const operationSymbol = formatOperation(question.operation);
  const operationColor = getOperationColor(question.operation);
  
  const formatOperand = (value: number | null): string => {
    return value === null ? '__' : String(value);
  };
  
  const formatResult = (): string => {
    if (question.questionType === 'fillInBlank' && question.missingPosition === 'result') {
      return '__';
    }
    return '?';
  };
  
  return (
    <div className="question-display" style={{ borderColor: operationColor }}>
      <div className="question-text">
        {formatOperand(question.operand1)} {operationSymbol} {formatOperand(question.operand2)} = {formatResult()}
      </div>
    </div>
  );
}

