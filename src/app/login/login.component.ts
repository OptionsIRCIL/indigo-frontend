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

@Component({
	selector: "app-login",
	imports: [
		ReactiveFormsModule,
		MatInputModule,
	],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent {
	loginForm: FormGroup = new FormGroup({
		username: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required),
	});

	public constructor(private readonly accessClient: AccessClientService) {}

	protected attemptLogin() {
		if (this.loginForm.valid) {
			this.accessClient.login(this.loginForm.value.username, this.loginForm.value.password);
		}
	}
}
