import { Component, input } from '@angular/core';
import { Animal, Shelter } from '../models';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.html',
  styleUrl: './animal-card.scss',
})
export class AnimalCard {
  readonly animal = input.required<Animal>();
  readonly shelter = input<Shelter>();
}
