import type { Operation } from '../types';

export function formatOperation(operation: Operation): string {
  const operationSymbols: Record<Operation, string> = {
    addition: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷',
  };
  return operationSymbols[operation];
}

