import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TokenState } from "../state/token-state.service";
import { Token } from "../../interface/token";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AccessClientService {
  constructor(private http: HttpClient,
							private tokenState: TokenState,
							private snackBar: MatSnackBar) { }

	public login(email: string, password: string) {
		this.http.post<Token>('http://acm.cs.und.edu:58080/api/v1/auth',
      {username: email, password: password},
      {withCredentials: true}).subscribe(
			{
				next: (res) => {
					this.tokenState.token.next(res);
					this.snackBar.open("Login successful", "Dismiss");
				},
				error: (err) => {
					this.tokenState.token.next(null);
          if (err.status === "409") {
            this.snackBar.open("Invalid Credentials", "Dismiss");
          } else {
            this.snackBar.open("Something went wrong. Please try again", "Dismiss");
          }
				}
			}
		)
	}
}
