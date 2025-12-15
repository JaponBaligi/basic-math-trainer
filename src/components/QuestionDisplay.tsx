import type { Question } from '../types';
import { formatOperation } from '../utils/formatOperation';
import { getOperationColor, getOperationBackgroundColor } from '../utils/operationColors';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const operationSymbol = formatOperation(question.operation);
  const operationColor = getOperationColor(question.operation);
  const operationBackgroundColor = getOperationBackgroundColor(question.operation);
  
  const formatOperand = (value: number | null): string => {
    return value === null ? '__' : String(value);
  };
  
  const formatResult = (): string => {
    if (question.questionType === 'fillInBlank') {
      if (question.missingPosition === 'result') {
        return '__';
      }
      return String(question.correctAnswer);
    }
    return '?';
  };
  
  return (
    <div 
      className="question-display" 
      style={{ 
        borderColor: operationColor,
        backgroundColor: operationBackgroundColor,
      }}
    >
      <div className="question-text">
        {formatOperand(question.operand1)} {operationSymbol} {formatOperand(question.operand2)} = {formatResult()}
      </div>
    </div>
  );
}

