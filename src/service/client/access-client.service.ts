import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TokenState } from "../state/token-state.service";
import { Token } from "../../interface/token";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import {environment} from '../../environments/envrionment';

@Injectable({
  providedIn: 'root'
})
export class AccessClientService {
  constructor(private http: HttpClient,
							private tokenState: TokenState,
							private router: Router,
							private snackBar: MatSnackBar) { }

	public login(email: string, password: string) {
		this.http.post<Token>(`${environment.apiUrl}auth`,
      {username: email, password: password},
      {withCredentials: true}).subscribe(
			{
				next: () => {
					const token: Token = { // THIS WILL BE REPLACED WITH UPDATED USER MODEL
						givenName: "Test",
						familyName: "User",
						groups: [],
						iss: "",
						aud: [],
						sub: "",
						exp: -1,
						nbf: -1,
						iat: -1,
					};
					this.tokenState.token.next(token);
					this.snackBar.open("Login successful", "Dismiss");
					this.router.navigate(['/main-dashboard']); // MAY BE REFACTORED TO ROUTE TO ACTIVATED ROUTE
				},
				error: (err) => {
					this.tokenState.token.next(null);
          if (err.status === 422) {
            this.snackBar.open("Invalid Credentials", "Dismiss");
          } else {
            this.snackBar.open("Something went wrong. Please try again", "Dismiss");
          }
				}
			}
		)
	}

	public logout() {
		this.tokenState.token.next(null);
		this.http
			.delete(`${environment.apiUrl}auth`, {
				withCredentials: true,
			})
			.subscribe({
				next: () => {
					this.tokenState.token.next(null);
					this.snackBar.open("Logout successful", "Dismiss");
					this.router.navigate(['/login']);
				},
				error: () => {
					this.snackBar.open("Logout failed", "Dismiss");
				}
			});
	}
}
