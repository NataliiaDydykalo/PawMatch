import { Component, computed, input, output } from '@angular/core';
import { AnimalCard } from '../animal-card/animal-card';
import { Animal, AnimalType, Shelter } from '../models';

@Component({
  selector: 'app-result',
  imports: [AnimalCard],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  readonly animalType = input.required<AnimalType>();
  readonly animals = input.required<Animal[]>();
  readonly shelters = input.required<Shelter[]>();
  readonly startOver = output<void>();

  protected readonly cards = computed(() =>
    this.animals().map(animal => ({
      animal,
      shelter: this.shelters().find(shelter => shelter.id === animal.shelterId),
    })),
  );
}
