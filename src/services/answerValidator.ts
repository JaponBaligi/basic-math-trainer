import type { Question, Operation } from '../types';

type OperandCalculator = (result: number, knownOperand: number) => number;

const operand1Calculators: Record<Operation, OperandCalculator> = {
  addition: (result, operand2) => result - operand2,
  subtraction: (result, operand2) => result + operand2,
  multiplication: (result, operand2) => result / operand2,
  division: (result, operand2) => result * operand2,
};

const operand2Calculators: Record<Operation, OperandCalculator> = {
  addition: (result, operand1) => result - operand1,
  subtraction: (result, operand1) => operand1 - result,
  multiplication: (result, operand1) => result / operand1,
  division: (result, operand1) => operand1 / result,
};

function getExpectedAnswer(question: Question): number {
  if (question.questionType !== 'fillInBlank' || !question.missingPosition) {
    return question.correctAnswer;
  }
  
  if (question.missingPosition === 'result') {
    return question.correctAnswer;
  }
  
  if (question.missingPosition === 'operand1' && question.operand2 !== null) {
    const calculator = operand1Calculators[question.operation];
    return calculator(question.correctAnswer, question.operand2);
  }
  
  if (question.missingPosition === 'operand2' && question.operand1 !== null) {
    const calculator = operand2Calculators[question.operation];
    return calculator(question.correctAnswer, question.operand1);
  }
  
  return question.correctAnswer;
}

export function validateAnswer(question: Question, userAnswer: string): boolean {
  const parsedAnswer = parseInt(userAnswer, 10);
  
  if (Number.isNaN(parsedAnswer)) {
    return false;
  }
  
  const expectedAnswer = getExpectedAnswer(question);
  return parsedAnswer === expectedAnswer;
}

