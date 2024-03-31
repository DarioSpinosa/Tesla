import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../directives/unsubscribe.directive';
import { CarColor, CarModel } from '../../models/car-model';
import { CarDataService } from '../../service/car-data.service';
import { CarStoreService } from '../../service/car-store.service';
import { SelectComponent } from '../select/select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [UnsubscribeDirective],
  imports: [AsyncPipe, FormsModule, SelectComponent],
  selector: 'app-car-selection',
  standalone: true,
  styleUrl: './car-selection.component.scss',
  templateUrl: './car-selection.component.html'
})
export class CarSelectionComponent implements OnInit {

  protected readonly colors: WritableSignal<CarColor[]> = signal<CarColor[]>([]);
  
  protected readonly models: WritableSignal<CarModel[]> = signal<CarModel[]>([]);

  protected selectedColorCode: string;

  protected selectedModelCode: string;

  private readonly _carDataService = inject(CarDataService);

  private readonly _carStoreService = inject(CarStoreService);

  private readonly _unsubscribeDirective = inject(UnsubscribeDirective);

  public ngOnInit(): void {
    this._carDataService.getModels().pipe(takeUntil(this._unsubscribeDirective.destroy$)).subscribe(models => this.models.set(models));
    this._restoreState();
  }

  protected onCarColorChange(code: string): void {
    this.selectedColorCode = code;
    const color = this.colors().find(color => color.code === this.selectedColorCode);
    this._carStoreService.selectColor(color);
  }

  protected onCarModelChange(code: string): void {
    this.selectedModelCode = code;
    if (code) {
      const model = this.models().find(model => model.code === this.selectedModelCode);
      this._setSelection(model)
    } else {
      this._resetSelection();
    }
  }

  private _resetSelection(): void {
    this.colors.set([]);
    this.selectedColorCode = null;
    this._carStoreService.unselectCar();
  }
  
  private _restoreState(): void {
    const selectedModel = this._carStoreService.selectedModel;
    if (selectedModel) {
      this.selectedModelCode = selectedModel.code;
      this.colors.set(selectedModel.colors);
      this.selectedColorCode = this._carStoreService.selectedColor.code;
    }
  }

  private _setSelection(model: CarModel): void {
    this._carStoreService.selectCar(model);
    this.colors.set(model.colors);
    this.onCarColorChange(this.colors()[0].code);
  }
}
