import { TestRun } from '../types/TestRun';
import { getTestName } from './labelUtils';

export const getTimelineBounds = (data: TestRun[]) => {
  if (!Array.isArray(data) || data.length === 0) {
    const now = Date.now();
    return {
      minDate: now - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
      maxDate: now
    };
  }

  const allDates = data.flatMap(run => {
    const begin = parseInt(run.loadtestbegintime);
    const end = parseInt(run.loadtestendtime);
    return [
      isNaN(begin) ? Date.now() : begin,
      isNaN(end) ? Date.now() : end
    ];
  });

  return {
    minDate: Math.min(...allDates),
    maxDate: Math.max(...allDates)
  };
};

export const getUniqueTestNames = (data: TestRun[]): string[] => {
  if (!Array.isArray(data)) return [];
  return Array.from(new Set(data.map(run => getTestName(run)))).sort();
};

export const groupTestsByName = (data: TestRun[]): Record<string, TestRun[]> => {
  if (!Array.isArray(data)) return {};
  
  return data.reduce((acc, run) => {
    const testName = getTestName(run);
    if (!acc[testName]) {
      acc[testName] = [];
    }
    acc[testName].push(run);
    return acc;
  }, {} as Record<string, TestRun[]>);
};