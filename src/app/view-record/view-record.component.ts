import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { AccessClientService } from "../../service/client/access-client.service";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatToolbar } from '@angular/material/toolbar';
import { IndividualContentDialog, OrganizationContentDialog } from '../main-dashboard/add-record/add-record.component';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
	selector: "app-view-record",
	imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    IndividualContentDialog,
],
	templateUrl: "./view-record-individual.component.html",
	styleUrl: "./view-record.component.css",
})
export class IndividualViewRecordComponent {
  private _Activatedroute: any;
  private id?: number;
  private sub: any;
  
	public constructor(private dialog: MatDialog, _Activatedroute:ActivatedRoute,
               private _router:Router,) {}

  ngOnInit() {
    // get the id from the route
    // find the id in the db for individuals
   }
  openEditRecord(message: string) {
      return this.dialog.open(IndividualContentDialog, {
        width: 'fit-content',
        height:'fit-content',
        maxWidth: '90vw',
        maxHeight: '90vh',
        panelClass: 'custom-dialog',
        data: { message }
      });
    }
}

@Component({
	selector: "app-view-record",
	imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    IndividualContentDialog,
],
	templateUrl: "./view-record-organization.component.html",
	styleUrl: "./view-record.component.css",
})
export class OrganizationViewRecordComponent {
	public constructor(private dialog: MatDialog) {}

    openEditRecord(message: string) {
        return this.dialog.open(OrganizationContentDialog, {
          width: 'fit-content',
          height:'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
          panelClass: 'custom-dialog',
          data: { message }
        });
      }
}