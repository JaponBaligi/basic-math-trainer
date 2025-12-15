import type { Operation } from '../types';

export function getOperationColor(operation: Operation): string {
  const colorMap: Record<Operation, string> = {
    addition: '#2563eb',
    subtraction: '#16a34a',
    multiplication: '#ea580c',
    division: '#9333ea',
  };
  return colorMap[operation];
}

export function getOperationBackgroundColor(operation: Operation): string {
  const colorMap: Record<Operation, string> = {
    addition: '#dbeafe',
    subtraction: '#dcfce7',
    multiplication: '#fed7aa',
    division: '#e9d5ff',
  };
  return colorMap[operation];
}

