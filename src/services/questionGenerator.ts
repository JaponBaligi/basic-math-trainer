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
      questionType: 'standard',
    };
  }
  
  const operand1 = generateSingleDigit();
  const operand2 = generateSingleDigit();
  return {
    operand1,
    operand2,
    operation: 'addition',
    correctAnswer: operand1 + operand2,
    questionType: 'standard',
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
        questionType: 'standard',
      };
    }
    return {
      operand1: operand2,
      operand2: operand1,
      operation: 'subtraction',
      correctAnswer: operand2 - operand1,
      questionType: 'standard',
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
      questionType: 'standard',
    };
  }
  return {
    operand1: operand2,
    operand2: operand1,
    operation: 'subtraction',
    correctAnswer: operand2 - operand1,
    questionType: 'standard',
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
      questionType: 'standard',
    };
  }
  
  const operand1 = generateSingleDigit();
  const operand2 = generateSingleDigit();
  return {
    operand1,
    operand2,
    operation: 'multiplication',
    correctAnswer: operand1 * operand2,
    questionType: 'standard',
  };
}

function generateDivisionQuestion(config: GameConfig): Question {
  if (config.allowTwoDigitOperations) {
    const divisor = generateSingleDigit();
    const maxQuotient = Math.floor(TWO_DIGIT_MAX / divisor);
    const minQuotient = Math.ceil(TWO_DIGIT_MIN / divisor);
    const quotient = randomInt(minQuotient, maxQuotient);
    const dividend = divisor * quotient;
    
    return {
      operand1: dividend,
      operand2: divisor,
      operation: 'division',
      correctAnswer: quotient,
      questionType: 'standard',
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
    questionType: 'standard',
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

