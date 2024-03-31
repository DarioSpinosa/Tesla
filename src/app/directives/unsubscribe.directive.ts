import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
  selector: '[unsubscribe]',
  standalone: true
})
export class UnsubscribeDirective implements OnDestroy {

  public readonly destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}