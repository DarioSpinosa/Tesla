import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type SelectOptions<T> = {
  display: keyof T
  id: string
  label: string
  placeholder?: boolean
  track: keyof T
}

@Component({
  imports: [FormsModule],
  selector: 'app-select',
  standalone: true,
  styleUrl: './select.component.scss',
  templateUrl: './select.component.html'
})
export class SelectComponent<T, K extends keyof T> {
  
  @Input({ required: true }) data: Array<T> = new Array<T>();
  
  @Input({ required: true }) options: SelectOptions<T>;
  
  @Input({ required: true }) prop: K;

  @Input() public value: T[K];
  
  @Output() public readonly valueChange: EventEmitter<T[K]> = new EventEmitter<T[K]>();
  
  protected onChange(): void {
    this.valueChange.emit(this.value);
  }
}
