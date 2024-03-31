import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel, CarOptions } from '../models/car-model';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {

  private _httpClient: HttpClient = inject(HttpClient);

  public getModels(): Observable<CarModel[]> {
    return this._httpClient.get<CarModel[]>('/models');
  }

  public getOptions(modelId: string): Observable<CarOptions> {
    return this._httpClient.get<CarOptions>(`/options/${modelId}`);
  }
}
