import { Component, input, output } from '@angular/core';
import { AnimalType } from '../models';

@Component({
  selector: 'app-animal-picker',
  templateUrl: './animal-picker.html',
  styleUrl: './animal-picker.scss',
})
export class AnimalPicker {
  readonly animalTypes = input.required<AnimalType[]>();
  readonly animalTypeSelected = output<AnimalType>();
}
