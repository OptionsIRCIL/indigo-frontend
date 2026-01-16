import { Component, Inject, Injectable} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}