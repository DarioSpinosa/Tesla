import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CarColor, CarConfig, CarModel, CarSelectedOptions } from '../models/car-model';

@Injectable({
  providedIn: 'root'
})
export class CarStoreService {

  public selectedColor: CarColor;
  
  public selectedModel: CarModel;

  public selectedOptions: CarSelectedOptions = { config: null };

  public readonly colorSelected$: Subject<boolean> = new Subject<boolean>();

  public readonly configSelected$: Subject<boolean> = new Subject<boolean>();
  
  public readonly modelSelected$: Subject<boolean> = new Subject<boolean>();

  public selectCar(model: CarModel): void {
    this.selectedModel = model;
    this.selectedOptions = { config: null };
    this.modelSelected$.next(true);
    this.configSelected$.next(false);
  }

  public selectColor(color: CarColor): void {
    this.selectedColor = color;
    this.colorSelected$.next(true);
  }
  
  public selectConfig(config: CarConfig): void {
    this.selectedOptions.config = config;
    this.configSelected$.next(!!config);
  }
  
  public unselectCar(): void {
    this.selectedModel = null;
    this.selectedColor = null;
    this.selectedOptions = { config: null };
    this.modelSelected$.next(false);
    this.colorSelected$.next(false);
    this.configSelected$.next(false);
  }
}
