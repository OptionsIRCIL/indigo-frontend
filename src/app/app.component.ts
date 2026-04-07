import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenState } from '../service/state/token-state.service';
import { AccessClientService } from '../service/client/access-client.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatInput } from "@angular/material/input";
import { MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { PersonClientService } from '../service/client/person-client.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		MatToolbarModule,
		MatButtonModule,
		MatIcon,
		MatCheckbox,
		MatInput,
		MatSidenav,
		MatSidenavContainer,
		RouterLink,
		AsyncPipe,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	standalone: true,
})
export class AppComponent implements OnInit {
	title = "indigo-frontend";
	protected toDoList: { task: string; isDone: boolean }[] = [];

	public constructor(
		private readonly accessClient: AccessClientService,
		protected readonly router: Router,
		protected readonly tokenState: TokenState,
		private readonly snackBar: MatSnackBar,
		private readonly personClient: PersonClientService,
	) {}

	ngOnInit() {
		const tempToDoList = localStorage.getItem("toDoList");
		if (tempToDoList) {
			this.toDoList = JSON.parse(tempToDoList);
		}
	}

	protected logout(): void {
		this.accessClient.logout().subscribe({
			next: () => {
				this.tokenState.token.next(false);
				window.cookieStore.delete("IndigoAuth");
				this.snackBar.open("Logout successful", "Dismiss");
				this.router.navigate(["/login"]);
			},
			error: () => {
				this.snackBar.open("Logout failed", "Dismiss");
			},
		});
	}

	addToDoItem(newTask: string) {
		this.toDoList.push({ task: newTask, isDone: false });
		localStorage.setItem("toDoList", JSON.stringify(this.toDoList));
	}

	deleteToDoItem(task: { task: string; isDone: boolean }) {
		this.toDoList.splice(this.toDoList.indexOf(task), 1);
		localStorage.setItem("toDoList", JSON.stringify(this.toDoList));
	}

	protected readonly window = window;
}
