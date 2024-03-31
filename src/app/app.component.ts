import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CarSelectionComponent } from './components/car-selection/car-selection.component';
import { CarStoreService } from './service/car-store.service';

type Tab = {
  enabled: boolean
  id: string
  title: string
  url: string
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CarSelectionComponent, FormsModule, RouterOutlet],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  protected readonly imageUrl: WritableSignal<string> = signal<string>('');

  private readonly _baseImageUrl: string = 'https://interstate21.com/tesla-app/images';

  private readonly _imageExtension: string = '.jpg';

  protected readonly tabs: Tab[] = [
    { enabled: true, id: 'step1', title: 'Step 1', url: 'carSelection' },
    { enabled: false, id: 'step2', title: 'Step 2', url: 'carConfiguration' },
    { enabled: false, id: 'step3', title: 'Step 3', url: 'carSummary' },
  ]

  private readonly _carStoreService = inject(CarStoreService);

  private readonly _router: Router = inject(Router);
  
  public ngOnInit(): void {
    this._carStoreService.colorSelected$.subscribe(val => val ? this._setImage() : this.imageUrl.set(''));
    this._carStoreService.configSelected$.subscribe(val => this.tabs[2].enabled = val);
    this._carStoreService.modelSelected$.subscribe(val => this.tabs[1].enabled = val);
  }

  protected onTabClick(url: string): void {
    this._router.navigateByUrl(url);
  }

  private _setImage(): void {
    const modelCode = this._carStoreService.selectedModel.code;
    const colorCode = this._carStoreService.selectedColor.code;
    this.imageUrl.set(`${this._baseImageUrl}/${modelCode}/${colorCode}${this._imageExtension}`);
  }
}
