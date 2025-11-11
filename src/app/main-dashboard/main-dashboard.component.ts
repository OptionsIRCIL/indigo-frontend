import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { AccessClientService } from "../../service/client/access-client.service";

@Component({
	selector: "app-main-dashboard",
	imports: [MatButtonModule],
	templateUrl: "./main-dashboard.component.html",
	styleUrl: "./main-dashboard.component.css",
})
export class MainDashboardComponent {
	public constructor(private readonly accessClient: AccessClientService) {
	}

	protected logout() {
		this.accessClient.logout();
	}
}
