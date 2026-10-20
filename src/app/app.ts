import { Component, OnInit, inject, signal } from '@angular/core';
import { AnimalPicker } from './animal-picker/animal-picker';
import { AnimalType, PawMatchData } from './models';
import { PetDataService } from './pet-data.service';

type Step = 'choose' | 'game' | 'result';

@Component({
  selector: 'app-root',
  imports: [AnimalPicker],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly petDataService = inject(PetDataService);

  protected readonly step = signal<Step>('choose');
  protected readonly data = signal<PawMatchData | null>(null);
  protected readonly hasLoadError = signal(false);
  protected readonly selectedAnimalType = signal<AnimalType | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.hasLoadError.set(false);
    this.petDataService.loadAll().subscribe({
      next: data => this.data.set(data),
      error: () => this.hasLoadError.set(true),
    });
  }

  protected chooseAnimalType(animalType: AnimalType): void {
    this.selectedAnimalType.set(animalType);
    this.step.set('game');
  }

  protected startOver(): void {
    this.selectedAnimalType.set(null);
    this.step.set('choose');
  }
}
