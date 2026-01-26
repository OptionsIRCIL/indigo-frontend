import { Component, Injector } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { AccessClientService } from "../../service/client/access-client.service";

import { MatToolbar } from '@angular/material/toolbar';
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
    MatToolbar
],
	templateUrl: "./main-dashboard.component.html",
	styleUrl: "./main-dashboard.component.css",
})
export class MainDashboardComponent {
	public constructor(private readonly accessClient: AccessClientService, private addRecord: addRecordDialogService) {}
	selectedFilters: string[] = ["State - ND", "City - Grand Forks", "Test"];

	protected logout() {
		this.accessClient.logout();
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
