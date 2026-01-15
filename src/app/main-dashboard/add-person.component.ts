import { Component, Inject, Injectable} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class AddPersonDialogService {
  constructor(private dialog: MatDialog) {}

  openMyDialog(message: string) {
    return this.dialog.open(AddPersonContentDialog, {
      width: '700px',
      data: { message }
    });
  }
}

@Component({
  selector: 'add-person-content-dialog',
  templateUrl: 'add-person-content.html',
})
export class AddPersonContentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddPersonContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}