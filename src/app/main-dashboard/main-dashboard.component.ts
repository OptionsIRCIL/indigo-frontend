import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { addRecordDialogService} from './add-record/add-record.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

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
		MatSidenavModule,
		MatCheckboxModule,
		CommonModule,
	],
	templateUrl: "./main-dashboard.component.html",
	styleUrl: "./main-dashboard.component.css",
})
export class MainDashboardComponent {

	records!: {
		firstName: string,
		lastName: string,
		salutation: string,
		email: string,
		phone: string,
		ethnicity: string,
		membership: string,
		gender: string,
		withheldDOB: boolean,
		optNews: boolean,
		dateOfBirth: string,
		withheldAddress: boolean,
		addressLine1: string,
		addressLine2: string,
		city: string,
		state: string,
		county: string,
		id: string,
	}[];

	public constructor(
    private addRecord: addRecordDialogService,
	private readonly router: Router,
	) {}

	ngOnInit() {
    // get the id from the route
    // find the id in the db for individuals
	//todo remove this later bc local storage change
    const stored = localStorage.getItem('records');
    this.records = stored ? JSON.parse(stored) : [];
   }

	selectedFilters: string[] = ["State - ND", "City - Grand Forks", "Test"];

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



	viewRecord(id: string) {
		
		try {
			console.log("Opening a record to view... ");
			let url = this.router.serializeUrl(
				this.router.createUrlTree(['/view-record', 'individual', id])
			);
			window.open(url, '_blank'); // opens in a new tab
		} catch (error) {
			console.error('Navigation error:', error);
		}

	}
}
