export interface AnimalType {
  id: string;
  name: string;
  pluralName: string;
  emoji: string;
  description: string;
}

export interface Statement {
  id: number;
  animalTypeId: string;
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface Shelter {
  id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
}

export interface Animal {
  id: number;
  animalTypeId: string;
  shelterId: string;
  name: string;
  age: string;
  description: string;
  photoUrl: string;
}

export interface PawMatchData {
  animalTypes: AnimalType[];
  statements: Statement[];
  animals: Animal[];
  shelters: Shelter[];
}
