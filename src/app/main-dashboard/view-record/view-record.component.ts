import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { AccessClientService } from "../../../service/client/access-client.service";

import { MatToolbar } from '@angular/material/toolbar';

@Component({
	selector: "app-view-record",
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
	templateUrl: "./view-record.component.html",
	styleUrl: "./view-record.component.css",
})
export class ViewRecordComponent {
	public constructor(private readonly accessClient: AccessClientService) {}

}