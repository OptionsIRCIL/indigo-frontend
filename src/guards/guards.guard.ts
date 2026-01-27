import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { map, take } from "rxjs";
import { TokenState } from '../service/state/token-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenState = inject(TokenState);
	const router = inject(Router);
  return tokenState.token.pipe(
		take(1),
		map(token => {
			if (token) return true;
			router.navigate(["/login"]);
			return false;
  	}))
};
