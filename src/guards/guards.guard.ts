import { CanActivateFn, RedirectCommand, Router } from "@angular/router";
import { inject } from "@angular/core";
import { map, take } from "rxjs";
import { TokenState } from '../service/state/token-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenState = inject(TokenState);

  if (tokenState.token.value) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('login'));
};
