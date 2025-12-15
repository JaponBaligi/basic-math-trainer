import type { Question, Operation, GameConfig } from '../types';
import { randomInt } from '../utils/random';

const SINGLE_DIGIT_MIN = 1;
const SINGLE_DIGIT_MAX = 9;
const TWO_DIGIT_MIN = 10;
const TWO_DIGIT_MAX = 99;

function generateSingleDigit(): number {
  return randomInt(SINGLE_DIGIT_MIN, SINGLE_DIGIT_MAX);
}

function generateTwoDigit(): number {
  return randomInt(TWO_DIGIT_MIN, TWO_DIGIT_MAX);
}

function generateAdditionQuestion(config: GameConfig): Question {
  if (config.allowTwoDigitOperations) {
    const operand1 = generateTwoDigit();
    const operand2 = generateTwoDigit();
    return {
      operand1,
      operand2,
      operation: 'addition',
      correctAnswer: operand1 + operand2,
    };
  }
  
  const operand1 = generateSingleDigit();
  const operand2 = generateSingleDigit();
  return {
    operand1,
    operand2,
    operation: 'addition',
    correctAnswer: operand1 + operand2,
  };
}

function generateSubtractionQuestion(config: GameConfig): Question {
  if (config.allowTwoDigitOperations) {
    const operand1 = generateTwoDigit();
    const operand2 = generateTwoDigit();
    if (operand1 >= operand2) {
      return {
        operand1,
        operand2,
        operation: 'subtraction',
        correctAnswer: operand1 - operand2,
      };
    }
    return {
      operand1: operand2,
      operand2: operand1,
      operation: 'subtraction',
      correctAnswer: operand2 - operand1,
    };
  }
  
  const operand1 = generateSingleDigit();
  const operand2 = generateSingleDigit();
  if (operand1 >= operand2) {
    return {
      operand1,
      operand2,
      operation: 'subtraction',
      correctAnswer: operand1 - operand2,
    };
  }
  return {
    operand1: operand2,
    operand2: operand1,
    operation: 'subtraction',
    correctAnswer: operand2 - operand1,
  };
}

function generateMultiplicationQuestion(config: GameConfig): Question {
  if (config.allowTwoDigitOperations) {
    const operand1 = generateTwoDigit();
    const operand2 = generateSingleDigit();
    return {
      operand1,
      operand2,
      operation: 'multiplication',
      correctAnswer: operand1 * operand2,
    };
  }
  
  const operand1 = generateSingleDigit();
  const operand2 = generateSingleDigit();
  return {
    operand1,
    operand2,
    operation: 'multiplication',
    correctAnswer: operand1 * operand2,
  };
}

function generateDivisionQuestion(config: GameConfig): Question {
  if (config.allowTwoDigitOperations) {
    const divisor = generateSingleDigit();
    const quotient = generateTwoDigit();
    const dividend = divisor * quotient;
    
    if (dividend <= TWO_DIGIT_MAX) {
      return {
        operand1: dividend,
        operand2: divisor,
        operation: 'division',
        correctAnswer: quotient,
      };
    }
    
    const smallerQuotient = Math.floor(TWO_DIGIT_MAX / divisor);
    const adjustedDividend = divisor * smallerQuotient;
    return {
      operand1: adjustedDividend,
      operand2: divisor,
      operation: 'division',
      correctAnswer: smallerQuotient,
    };
  }
  
  const divisor = generateSingleDigit();
  const quotient = generateSingleDigit();
  const dividend = divisor * quotient;
  return {
    operand1: dividend,
    operand2: divisor,
    operation: 'division',
    correctAnswer: quotient,
  };
}

const questionGenerators: Record<Operation, (config: GameConfig) => Question> = {
  addition: generateAdditionQuestion,
  subtraction: generateSubtractionQuestion,
  multiplication: generateMultiplicationQuestion,
  division: generateDivisionQuestion,
};

export function generateQuestion(config: GameConfig): Question {
  const operations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division'];
  const randomOperation = operations[randomInt(0, operations.length - 1)];
  const generator = questionGenerators[randomOperation];
  return generator(config);
}

