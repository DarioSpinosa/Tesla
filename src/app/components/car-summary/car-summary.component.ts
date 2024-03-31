import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CarColor, CarModel, CarSelectedOptions } from '../../models/car-model';
import { CarStoreService } from '../../service/car-store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe],
  selector: 'app-car-summary',
  standalone: true,
  styleUrl: './car-summary.component.scss',
  templateUrl: './car-summary.component.html'
})
export class CarSummaryComponent implements OnInit {
  
  protected readonly accessoriesPrice: number = 1000;
  
  protected color: CarColor;

  protected model: CarModel;

  protected options: CarSelectedOptions;

  protected totalPrice: number;

  private readonly _carStoreService = inject(CarStoreService);

  public ngOnInit(): void {
    this._setCarConfiguration();
    this._calculateTotalPrice();
  }
  
  private _addAccessoriesPrice(val: boolean): void {
    this.totalPrice += !!val ? this.accessoriesPrice : 0;
  }

  private _calculateTotalPrice(): void {
    this.totalPrice = this.options.config.price + this.color.price;
    this._addAccessoriesPrice(this.options.towHitch);
    this._addAccessoriesPrice(this.options.yoke);
  }

  private _setCarConfiguration(): void {
    this.model = this._carStoreService.selectedModel;
    this.color = this._carStoreService.selectedColor;
    this.options = this._carStoreService.selectedOptions;
  }
}
