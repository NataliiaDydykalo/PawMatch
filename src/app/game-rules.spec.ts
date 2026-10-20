import { Animal, Statement } from './models';
import { pickAnimalsFromDifferentShelters, pointsForAnswer, shuffle } from './game-rules';

function createStatement(isTrue: boolean): Statement {
  return { id: 1, animalTypeId: 'dog', text: 'Test statement', isTrue, explanation: 'Test explanation' };
}

function createAnimal(id: number, shelterId: string): Animal {
  return { id, animalTypeId: 'dog', shelterId, name: `Dog ${id}`, age: '1 year', description: '', photoUrl: '' };
}

describe('pointsForAnswer', () => {
  it('gives 2 points for a correct answer', () => {
    expect(pointsForAnswer(createStatement(true), true)).toBe(2);
    expect(pointsForAnswer(createStatement(false), false)).toBe(2);
  });

  it('gives 0 points for a wrong answer', () => {
    expect(pointsForAnswer(createStatement(true), false)).toBe(0);
    expect(pointsForAnswer(createStatement(false), true)).toBe(0);
  });
});

describe('pickAnimalsFromDifferentShelters', () => {
  it('picks at most one animal per shelter', () => {
    const animals = [createAnimal(1, 'a'), createAnimal(2, 'a'), createAnimal(3, 'b')];

    const picked = pickAnimalsFromDifferentShelters(animals, 3);

    expect(picked.map(animal => animal.id)).toEqual([1, 3]);
  });

  it('never picks more than the max count', () => {
    const animals = [createAnimal(1, 'a'), createAnimal(2, 'b'), createAnimal(3, 'c'), createAnimal(4, 'd')];

    const picked = pickAnimalsFromDifferentShelters(animals, 3);

    expect(picked.length).toBe(3);
  });

  it('returns an empty list when there are no animals', () => {
    expect(pickAnimalsFromDifferentShelters([], 3)).toEqual([]);
  });
});

describe('shuffle', () => {
  it('keeps all items and does not change the original array', () => {
    const original = [1, 2, 3, 4, 5];

    const shuffled = shuffle(original);

    expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
