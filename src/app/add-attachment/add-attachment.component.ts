import { Component, Inject, Injectable } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import {
	MatDialog,
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSelect, MatOption } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { FormControl, Validators } from "@angular/forms";
import { MatError } from "@angular/material/select";

@Injectable({ providedIn: "root" })
export class AddFormOrAttachmentDialog {
	constructor(private dialog: MatDialog) {}
	openAttachmentDialog(message: string) {
		return this.dialog.open(AddAttachmentContentDialog, {
			width: "fit-content",
			height: "fit-content",
			maxWidth: "90vw",
			maxHeight: "90vh",
			panelClass: "custom-dialog",
			data: { message },
		});
	}
}

@Component({
	selector: "add-form-dialog",
	templateUrl: "add-attachment-content.html",
	imports: [MatDialogModule, MatIconModule, MatCardModule],
})
export class AddAttachmentContentDialog {
	constructor(
		public dialogRef: MatDialogRef<AddAttachmentContentDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	onCancelClick(): void {
		this.dialogRef.close();
	}
}
