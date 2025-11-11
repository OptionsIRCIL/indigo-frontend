import { CanActivateFn, Router } from '@angular/router';
import { TokenState } from "../service/state/token-state.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenState);
	const router = inject(Router);
	if (token) {
		return true
	}
	router.navigate(['login']).then();
	return false;
};
