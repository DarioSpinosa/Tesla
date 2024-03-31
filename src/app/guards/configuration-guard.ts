import { CanActivateFn, Router } from "@angular/router";
import { CarStoreService } from "../service/car-store.service";
import { inject } from "@angular/core";

export function configurationGuard(): CanActivateFn {
  return () => {
    if (!!inject(CarStoreService).selectedModel) {
      return true;
    }
    inject(Router).navigateByUrl('');
    return false;
  };
}