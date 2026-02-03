import { Component, Injector } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { AccessClientService } from '../../service/client/access-client.service';
import { Router } from '@angular/router';
import { TokenState } from '../../service/state/token-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addRecordDialogService} from './add-record/add-record.component';

@Component({
	selector: "app-main-dashboard",
	imports: [
		MatButtonModule,
		MatFormField,
		MatInputModule,
		MatIconModule,
		MatChipsModule,
		MatExpansionModule,
		MatCardModule,
		MatToolbar,
	],
	templateUrl: "./main-dashboard.component.html",
	styleUrl: "./main-dashboard.component.css",
})
export class MainDashboardComponent {
	public constructor(
		private readonly accessClient: AccessClientService,
		protected readonly router: Router,
		protected readonly tokenState: TokenState,
		private readonly snackBar: MatSnackBar,
    private addRecord: addRecordDialogService
	) {}
	selectedFilters: string[] = ["State - ND", "City - Grand Forks", "Test"];

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

	openFilters() {
		console.log("Filters opened");
	}

	removeFilter(filter: string) {
		this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
	}

	search() {
		console.log("Searching...");
	}

	addNewRecord() {
		console.log("Adding new person...");
		this.addRecord.openMyDialog('Open Add Record');
	}

	organizationResults() {
		console.log("Showing organization results...");
	}
}
