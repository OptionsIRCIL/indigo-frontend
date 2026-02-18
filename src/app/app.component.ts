import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenState } from '../service/state/token-state.service';
import { AccessClientService } from '../service/client/access-client.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: "app-root",
	imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
  ],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
	title = "indigo-frontend";

	public constructor(
		private readonly accessClient: AccessClientService,
		protected readonly router: Router,
		protected readonly tokenState: TokenState,
		private readonly snackBar: MatSnackBar,
	) {}

	ngOnInit(): void {}

	protected logout(): void {
		this.accessClient.logout().subscribe({
			next: () => {
				this.tokenState.token.next(null);
				this.snackBar.open("Logout successful", "Dismiss");
				this.router.navigate(["/login"]);
			},
			error: () => {
				this.snackBar.open("Logout failed", "Dismiss");
			},
		});
	}
}
