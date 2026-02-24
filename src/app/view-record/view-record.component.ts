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
  
	public constructor(
    private dialog: MatDialog, 
    _Activatedroute:ActivatedRoute,
    private _router:Router,
    private readonly accessClient: AccessClientService,
    protected readonly tokenState: TokenState,
    private readonly snackBar: MatSnackBar,
  ) {}

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
  //TODO determine why main dash redirect function is not working
  // FIXME logs the user out instead of navigating to main dashboard
  goToMainDashboard(): void {
    console.log("routing to main dashboard");
    try {
      this._router.navigate(["/main-dashboard"]);
    } catch (error) {
      console.error("Error:", error)
    }
    
	}

  protected logout(): void {
		this.accessClient.logout().subscribe({
			next: () => {
				this.tokenState.token.next(null);
				this.snackBar.open("Logout successful", "Dismiss");
				this._router.navigate(["/login"]);
			},
			error: () => {
				this.snackBar.open("Logout failed", "Dismiss");
			},
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