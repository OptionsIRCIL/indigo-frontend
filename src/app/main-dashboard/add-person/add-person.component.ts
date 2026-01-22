import { Component, ElementRef, Inject, Injectable, Input, ViewChild} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';


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

    // Add Alias
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


/*
Autocomplete chips selector
*/

export let membershipList = ['Club A', 'Club B', 'Club C'];
export let additionalDisabilityList = ['Disability A', 'Disability B', 'Disability C'];

@Component({
  selector: 'chips-autocomplete-selector',
  standalone: true,
  template: `
    <mat-form-field class="chip-list">
      <mat-chip-grid #chipGrid>
        <mat-chip-row
          *ngFor="let option of options"
          (removed)="remove(option)"
        >
          {{ option }}
          <mat-icon matChipRemove>cancel</mat-icon>
        </mat-chip-row>

        <input
          [attr.name]="optionType"
          [placeholder]="optionTypeText"
          #optionInput
          [formControl]="optionCtrl"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipGrid"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="addOnBlur"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-chip-grid>

      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="selected($event)"
      >
        <mat-option
          *ngFor="let option of filteredOptions | async"
          [value]="option"
        >
          {{ option }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    `,
  styleUrls: ['individual-content.css',],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,],
})
export class ChipsAutocompleteOption {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  optionCtrl = new FormControl<string | null>(null);
  filteredOptions: Observable<string[]>;

  options: string[] = [];
  allOptions: string[] = [];
  

  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @Input() optionType!: string;
  @Input() optionTypeText!: string;

  ngOnInit(): void {
    switch (this.optionType){
      case "Memberships":
        this.allOptions = membershipList;
        break;
      case "AdditionalDisability":
        this.allOptions = additionalDisabilityList;
        break;
      default:
        this.allOptions = [];
    }
  }

  constructor() {
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(null),
      map((option) =>
        option ? this._filter(option) : this.allOptions.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const value = (event.value || '').trim();

      if (value) {
        this.options.push(value);
      }

      event.chipInput?.clear();
      this.optionCtrl.setValue(null);
    }
  }

  remove(option: string): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.options.push(event.option.viewValue);
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter((option) =>
      option.toLowerCase().startsWith(filterValue)
    );
  }
}

/**
 * @title Radio Button Component
 * 
 **/
@Component({
  selector: 'radio-ng-model',
  standalone: true,
  template: `<mat-radio-group aria-label="Select an option" [(ngModel)]="selectedOption">
                <mat-radio-button value="Yes">Yes</mat-radio-button>
                <mat-radio-button value="No">No</mat-radio-button>
            </mat-radio-group>`,
  imports: [MatRadioModule, FormsModule],
})
export class RadioNgModel {
  selectedOption!: string;
}

/* Individual Dialog box content */

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
    ChipsAutocompleteOption,
    MatRadioModule,
    RadioNgModel,
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