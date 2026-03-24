import { Component, Inject, Injectable} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButton} from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect, MatOption} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormControl, Validators } from '@angular/forms';
import { MatError } from '@angular/material/select';

@Component({
  selector: 'form-selector',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatSelect, MatOption, MatButton, FormsModule, CommonModule],
  template: `<div id = "forms">
              <form id="form">
                <mat-select name="formSelect" [(ngModel)]="selectedForm">
                    <mat-option *ngFor="let option of options" [value]="option">
                      {{ option }}
                    </mat-option>
                </mat-select>
                <br><br>
                <mat-dialog-actions>
                    <button mat-raised-button style="margin: 10px;" type = "submit" (click)="submitForm()">Submit</button>
                </mat-dialog-actions>
              </form>
            </div>`,
  styleUrls: [],
 
})
export class FormSelector {
  options: string[] = [];
  constructor( private readonly router: Router,  @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (data?.message == "i"){ 
        this.options =  ['Information and Referral', 'Direct service', 'Goals', 'Consumer Service Record'];
      } else {
        this.options = ['Information and Referral', 'Community, Education, and Outreach'];
      }
    }

  selectedForm: string = 'Information and Referral';

  submitForm(): void {
    if (this.selectedForm == null){  

      return;
    }
    let url = this.router.serializeUrl(
                this.router.createUrlTree(['/error', 'not-found'])
              );
    switch (this.selectedForm) {
      case 'Information and Referral' :
        url = this.router.serializeUrl(
                this.router.createUrlTree(['/information-and-referral'])
              );
        break;
      case 'Community, Education, and Outreach' :
        url = this.router.serializeUrl(
                this.router.createUrlTree(['/community-education-outreach'])
              );
        break;
      case 'Goals' :
        url = this.router.serializeUrl(
                this.router.createUrlTree(['/goals'])
              );
        break;
      case 'Consumer Service Record' :
        url = this.router.serializeUrl(
                this.router.createUrlTree(['/consumer-service-record'])
              );
        break;
      default:
        break;
    }

    try { 
      window.open(url, '_blank'); // opens in a new tab
    } catch (error) {
      console.error('Navigation error:', error);
    } 
  }
}

@Injectable({ providedIn: 'root' })
export class AddFormOrAttachmentDialog {
  constructor(private dialog: MatDialog) {}

  openFormDialog(message: string) {
    return this.dialog.open(AddFormContentDialog, {
      width: 'fit-content',
      height:'fit-content',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      data: { message }
    });
  }
  openAttachmentDialog(message: string) {
    return this.dialog.open(AddAttachmentContentDialog, {
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
  selector: 'add-form-dialog',
  templateUrl: 'add-form-content.html',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    FormSelector,
    CommonModule,
  ]
})
export class AddFormContentDialog {
  isIndividual: boolean = false; 
  constructor(
    public dialogRef: MatDialogRef<AddFormContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (data?.message == "i"){ this.isIndividual = true; }
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'add-form-dialog',
  templateUrl: 'add-attachment-content.html',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ]
})
export class AddAttachmentContentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddAttachmentContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}


