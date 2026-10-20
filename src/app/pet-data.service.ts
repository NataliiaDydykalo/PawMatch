import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Animal, AnimalType, PawMatchData, Shelter, Statement } from './models';

@Injectable({ providedIn: 'root' })
export class PetDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'mocks';

  loadAll(): Observable<PawMatchData> {
    return forkJoin({
      animalTypes: this.http.get<AnimalType[]>(`${this.baseUrl}/animal-types.json`),
      statements: this.http.get<Statement[]>(`${this.baseUrl}/statements.json`),
      animals: this.http.get<Animal[]>(`${this.baseUrl}/animals.json`),
      shelters: this.http.get<Shelter[]>(`${this.baseUrl}/shelters.json`),
    });
  }
}
