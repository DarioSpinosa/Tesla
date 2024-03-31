import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../directives/unsubscribe.directive';
import { CarConfig, CarOptions } from '../../models/car-model';
import { CarDataService } from '../../service/car-data.service';
import { CarStoreService } from '../../service/car-store.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectComponent } from '../select/select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [UnsubscribeDirective],
  imports: [CheckboxComponent, CurrencyPipe, FormsModule, SelectComponent],
  selector: 'app-car-configuration',
  standalone: true,
  styleUrl: './car-configuration.component.scss',
  templateUrl: './car-configuration.component.html'
})
export class CarConfigurationComponent implements OnInit {

  protected readonly config: WritableSignal<CarConfig> = signal<CarConfig>(null);
  
  protected readonly options: WritableSignal<CarOptions> = signal<CarOptions>({ configs: [], towHitch: false, yoke: false });
  
  protected selectedConfigId: number;

  protected towChecked: boolean;

  protected yokeChecked: boolean;

  private readonly _carDataService = inject(CarDataService);

  private readonly _carStoreService = inject(CarStoreService);

  private readonly _unsubscribeDirective = inject(UnsubscribeDirective);

  public ngOnInit(): void {
    this._carDataService.getOptions(this._carStoreService.selectedModel.code).pipe(takeUntil(this._unsubscribeDirective.destroy$)).subscribe(val => this.options.set(val));
    this._restoreState();
  }

  protected onConfigChange(id: number): void {
    this.selectedConfigId = id;
    const config = id ? this.options().configs.find(config => config.id === this.selectedConfigId) : null;
    this.config.set(config);
    this._carStoreService.selectConfig(config);
  }

  protected onTowChange(tow: boolean): void {
    this.towChecked = tow;
    this._carStoreService.selectedOptions.towHitch = tow;
  }

  protected onYokeChange(yoke: boolean): void {
    this.yokeChecked = yoke;
    this._carStoreService.selectedOptions.yoke = yoke;
  }

  private _restoreState(): void {
    const selectedOptions = this._carStoreService.selectedOptions
    if (selectedOptions.config) {
      this.config.set(selectedOptions.config);
      this.selectedConfigId = selectedOptions.config.id;
    }
    this.towChecked = !!selectedOptions.towHitch;
    this.yokeChecked = !!selectedOptions.yoke;
  }
}
