import { Component, Inject, Injectable} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

@Injectable({ providedIn: 'root' })
export class AddPersonDialogService {
  constructor(private dialog: MatDialog) {}

  openMyDialog(message: string) {
    return this.dialog.open(AddPersonContentDialog, {
      width: 'fit-content',
      height:'fit-content',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      data: { message }
    });
  }

  openIndividual(message: string) {
    return this.dialog.open(IndividualContentDialog, {
      width: 'fit-content',
      height:'fit-content',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      data: { message }
    });
  }
  // openOrganization(message: string) {
  //   return this.dialog.open(OrganizationContentDialog, {
  //     width: 'fit-content',
  //     height:'fit-content',
  //     maxWidth: '90vw',
  //     maxHeight: '90vh',
  //     panelClass: 'custom-dialog',
  //     data: { message }
  //   });
  // }
}

@Component({
  selector: 'add-person-content-dialog',
  templateUrl: 'add-person-content.html',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AddPersonContentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddPersonContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private addPerson: AddPersonDialogService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  personTypeClick(type: string){
    if (type == "Individual"){
      this.dialogRef.close();
      
      // show html page for individual
      this.addPerson.openIndividual("");

    } else {
      // show html page for organization
    }

  }
}

@Component({
  selector: 'individual-content-dialog',
  templateUrl: 'individual-content.html',
  styleUrls: ['individual-content.css'],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class IndividualContentDialog {
  constructor(
    public dialogRef: MatDialogRef<IndividualContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}