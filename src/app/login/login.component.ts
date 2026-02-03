import { Component } from '@angular/core';
import {
	MatInputModule,
} from "@angular/material/input";
import { AccessClientService } from "../../service/client/access-client.service";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TokenState } from "../../service/state/token-state.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	imports: [ReactiveFormsModule, MatInputModule, MatButton, MatButtonModule, MatFormFieldModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent {
	loginForm: FormGroup = new FormGroup({
		email: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required),
	});

	public constructor(private readonly accessClient: AccessClientService,
										 private readonly tokenState: TokenState,
										 private readonly snackBar: MatSnackBar,
										 private readonly router: Router,) {}

	protected attemptLogin() {
		if (this.loginForm.valid) {
			this.accessClient
				.login(this.loginForm.value.email, this.loginForm.value.password)
				.subscribe({
					next: () => {
						this.tokenState.token.next("Test User");
						this.snackBar.open("Login successful", "Dismiss");
						this.router.navigate(["/main-dashboard"]).then(); // MAY BE REFACTORED TO ROUTE TO ACTIVATED ROUTE
					},
					error: (err) => {
						this.tokenState.token.next(null);
						if (err.status === 422) {
							this.snackBar.open("Invalid Credentials", "Dismiss");
						} else {
							this.snackBar.open(
								"Something went wrong. Please try again",
								"Dismiss",
							);
						}
					},
				});
		}
	}
}
