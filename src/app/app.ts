import { Component, OnInit, inject, signal } from '@angular/core';
import { PawMatchData } from './models';
import { PetDataService } from './pet-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly petDataService = inject(PetDataService);

  protected readonly data = signal<PawMatchData | null>(null);
  protected readonly hasLoadError = signal(false);

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
}
