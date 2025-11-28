import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { AccessClientService } from '../service/client/access-client.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accessClient = inject(AccessClientService);
  return accessClient.get().pipe(map(
    data => {
      return !!data;
    }
  ));
};
