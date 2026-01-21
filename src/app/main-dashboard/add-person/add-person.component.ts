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
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';


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
    MatButtonModule,
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

/*
Alias interface and Chip Input Component
*/

export interface Alias {
  name: string;
}

@Component({
  selector: 'chips-input-alias',
  template: `<mat-form-field class="chip-list" appearance="fill">
                <mat-label>Aliases</mat-label>
                <mat-chip-grid #chipGrid aria-label="Alias List">
                    <mat-chip-row *ngFor="let alias of aliases"
                            [removable]="removable" (removed)="remove(alias)">
                    {{alias.name}}
                    <button matChipRemove *ngIf="removable">
                        <mat-icon>cancel</mat-icon>
                    </button>
                    </mat-chip-row>
                    <input placeholder="New Alias..."
                        [matChipInputFor]="chipGrid"
                        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                        [matChipInputAddOnBlur]="addOnBlur"
                        (matChipInputTokenEnd)="add($event)">
                </mat-chip-grid>
            </mat-form-field>`,
  styleUrls: ['individual-content.css',],
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, CommonModule],
})
export class AliasChipsInput {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  aliases: Alias[] = [
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.aliases.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(alias: Alias): void {
    const index = this.aliases.indexOf(alias);

    if (index >= 0) {
      this.aliases.splice(index, 1);
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
    MatChipsModule,
    AliasChipsInput,
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