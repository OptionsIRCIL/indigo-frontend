import { Component, OnInit } from "@angular/core";
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from "@angular/material/checkbox";

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
		MatSidenavModule,
		MatCheckboxModule,
	],
	templateUrl: "./main-dashboard.component.html",
	styleUrl: "./main-dashboard.component.css",
})
export class MainDashboardComponent implements OnInit {
	protected toDoList: { task: string; isDone: boolean }[] = [];

	public constructor(
    private addRecord: addRecordDialogService,
		private readonly accessClient: AccessClientService,
		protected readonly router: Router,
		protected readonly tokenState: TokenState,
		private readonly snackBar: MatSnackBar,
	) {}
	selectedFilters: string[] = ["State - ND", "City - Grand Forks", "Test"];


	ngOnInit() {
		const tempToDoList = localStorage.getItem("toDoList");
		if (tempToDoList) {
			this.toDoList = JSON.parse(tempToDoList);
		}
	}

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
		this.addRecord.openMyDialog("Open Add Record");
	}

	organizationResults() {
		console.log("Showing organization results...");
	}

	addToDoItem(newTask: string) {
		this.toDoList.push({ task: newTask, isDone: false });
		localStorage.setItem("toDoList", JSON.stringify(this.toDoList));
	}

	deleteToDoItem(task: { task: string; isDone: boolean }) {
		this.toDoList.splice(this.toDoList.indexOf(task), 1);
	}

	viewRecord() {
		console.log("Opening a record to view...");
	}
}
