import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type CheckBoxOptions = {
  id: string
  label: string
}

@Component({
  imports: [FormsModule],
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {

  @Input({ required: true }) public options: CheckBoxOptions;
  
  @Input() public value: boolean = false;
  
  @Output() public readonly valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected onChange(): void {
    this.valueChange.emit(this.value);
  }
}
