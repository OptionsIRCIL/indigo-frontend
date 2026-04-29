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
import { IndividualContentDialog, OrganizationContentDialog } from '../main-dashboard/add-record/add-record.component';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenState } from '../../service/state/token-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFormContentDialog, AddAttachmentContentDialog} from './add-form-or-attachment/add-form-or-attachment.component';

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
],
	templateUrl: "./view-record-individual.component.html",
	styleUrl: "./view-record.component.css",
})
export class IndividualViewRecordComponent {
  private _Activatedroute: any;
  private id?: number;
  private sub: any;
  record!: {
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
    disabilities: string,
  }

	public constructor(
    private dialog: MatDialog,
    _Activatedroute:ActivatedRoute,
    private route: ActivatedRoute,
    private _router:Router,
    private readonly accessClient: AccessClientService,
    protected readonly tokenState: TokenState,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // get the id from the route
    // find the id in the db for individuals
    const id = this.route.snapshot.paramMap.get('id');
    const stored = localStorage.getItem('records');
    const records = stored ? JSON.parse(stored) : [];
    this.record =  records.find((r: any) => r.id === id);
   }
  openEditRecord(mode: string) {
      return this.dialog.open(IndividualContentDialog, {
        width: 'fit-content',
        height:'fit-content',
        maxWidth: '90vw',
        maxHeight: '90vh',
        panelClass: 'custom-dialog',
        data: { 
          mode,
          record: this.record,
         }
      });
    }
  openAddForm( message: string){
    return this.dialog.open(AddFormContentDialog, {
          width: 'fit-content',
          height:'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
          panelClass: 'custom-dialog',
          data: { message }
      });
  }
  openAddAttachment(){
    return this.dialog.open(AddAttachmentContentDialog, {
          width: 'fit-content',
          height:'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
          panelClass: 'custom-dialog',
          data: {}
      });
  }


  /* 
  openExistingForm
  opens any form in view-record that is listed under the form tabs
      formChar - specifies the form type that will be opened
  */
 openExistingForm(formChar: string){
    let url;
    //get id for selected form
    const formId = "";
    // route to the form depending on type
    try {

      switch (formChar){
        case "i":
          url = this._router.serializeUrl(
            this._router.createUrlTree(['/information-and-referral', formId])
          );
          break;
        case "g":
          url = this._router.serializeUrl(
            this._router.createUrlTree(['/goals', formId])
          );
          break;
        case "c":
          url = this._router.serializeUrl(
            this._router.createUrlTree(['/consumer-information-file', formId])
          );
          break;
      }

      window.open(url, '_blank'); // opens in a new tab

    } catch (error) {
      console.error('Navigation error:', error);
    }
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
],
	templateUrl: "./view-record-organization.component.html",
	styleUrl: "./view-record.component.css",
})
export class OrganizationViewRecordComponent {
	
  orgRecord!: {
      name: string,
      email: string,
      phone: string,
      addressLine1: string,
      addressLine2: string,
      city: string,
      state: string,
      county: string,
      id: string,
      createdAt: Date,
      updatedAt: Date,
    };

    public constructor(
      private dialog: MatDialog, 
      private route: ActivatedRoute) {}

    ngOnInit (){
        const id = this.route.snapshot.paramMap.get('id');
        const orgStored = localStorage.getItem('org-records');
        const orgRecords = orgStored ? JSON.parse(orgStored) : [];
        this.orgRecord =  orgRecords.find((r: any) => r.id === id);
    }

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

    openAddForm(message?: string){
    return this.dialog.open(AddFormContentDialog, {
          width: 'fit-content',
          height:'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
          panelClass: 'custom-dialog',
          data: {message}
      });
  }
  openAddAttachment(){
    return this.dialog.open(AddAttachmentContentDialog, {
          width: 'fit-content',
          height:'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
          panelClass: 'custom-dialog',
          data: {}
      });
  }
}
