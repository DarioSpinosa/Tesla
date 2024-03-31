import { CanActivateFn, Router } from "@angular/router";
import { CarStoreService } from "../service/car-store.service";
import { inject } from "@angular/core";

export function summaryGuard(): CanActivateFn {
  return () => {
    if (!!inject(CarStoreService).selectedOptions.config) {
      return true;
    }
    inject(Router).navigateByUrl('');
    return false;
  };
}