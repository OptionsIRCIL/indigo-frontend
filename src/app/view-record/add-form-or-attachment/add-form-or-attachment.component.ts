import { Component, ElementRef, Inject, Injectable, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption, MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'individual-form-selector',
  template: `<div id = "individualForms">
                <mat-select placeholder="Form">
                    <mat-option value="Information and Referral">Information and Referral</mat-option>
                    <mat-option value="Direct service">Direct service</mat-option>
                </mat-select>
                <br><br>
                <mat-dialog-actions>
                    <button mat-raised-button style="margin: 10px;">Submit</button>
                </mat-dialog-actions>
            </div>`,
  styleUrls: [],
  imports: [MatIconModule, MatDialogModule, MatSelectModule, MatButtonModule],
})
export class IndividualFormSelector {
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
    MatButtonModule,
    MatLabel,
    MatSelect,
    MatOption,
    IndividualFormSelector
  ]
})
export class AddFormContentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddFormContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    MatButtonModule,
    MatLabel,
    MatSelect,
    MatOption,
    IndividualFormSelector,
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


