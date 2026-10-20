import { Animal, Statement } from './models';

export const WINNING_SCORE = 20;
export const POINTS_PER_CORRECT_ANSWER = 2;
export const MAX_MATCHES = 3;

export function pointsForAnswer(statement: Statement, answeredAsFact: boolean): number {
  return statement.isTrue === answeredAsFact ? POINTS_PER_CORRECT_ANSWER : 0;
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }
  return result;
}

export function pickAnimalsFromDifferentShelters(animals: Animal[], maxCount: number): Animal[] {
  const picked: Animal[] = [];
  const usedShelterIds = new Set<string>();

  for (const animal of animals) {
    if (picked.length === maxCount) {
      break;
    }
    if (!usedShelterIds.has(animal.shelterId)) {
      picked.push(animal);
      usedShelterIds.add(animal.shelterId);
    }
  }

  return picked;
}
