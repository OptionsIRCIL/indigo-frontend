import { Component, ElementRef, Inject, Injectable, Input, ViewChild, EventEmitter, Output, importProvidersFrom, ViewChildren, QueryList, Directive, HostListener} from '@angular/core';
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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Injectable({ providedIn: 'root' })
export class addRecordDialogService {
  constructor(private dialog: MatDialog) {}

  openMyDialog(message: string) {
    return this.dialog.open(addRecordContentDialog, {
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
  openOrganization(message: string) {
    return this.dialog.open(OrganizationContentDialog, {
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
  selector: 'add-record-content-dialog',
  templateUrl: 'add-record-content.html',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class addRecordContentDialog {
  constructor(
    public dialogRef: MatDialogRef<addRecordContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private addRecord: addRecordDialogService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  recordTypeClick(type: string){
    if (type == "Individual"){
      this.dialogRef.close();
      
      // show html page for individual
      this.addRecord.openIndividual("");

    } else {
      // show html page for organization
      this.addRecord.openOrganization("");
    }

  }
}

/* Phone formatter 
  allows dashes to appear as user types phone number
*/
@Directive({
  selector: '[phoneFormat]'
})
export class phoneFormatter {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = this.el.nativeElement.value.replace(/\D/g, '');

    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }

    this.el.nativeElement.value = value;
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
  styleUrls: ['././individual/add-record-individual-content.css',],
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
  styleUrls: ['././individual/add-record-individual-content.css',],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
})
export class ChipsAutocompleteOption {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  optionCtrl = new FormControl<string | null>(null);
  filteredOptions: Observable<string[]>;

  @Input() options: string[] = [];
  ngOnChanges() {
    this.setOptions(this.options);
  }
  allOptions: string[] = [];
  

  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @Input() optionType!: string;
  @Input() optionTypeText!: string;
  @Input() initialOptions: string[] = [];

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

    if (this.initialOptions?.length) {
      this.options = this.options.concat(this.initialOptions);
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

  setOptions(values: string[]) {
    values.forEach((value)=> {
      this.options.push(value)
      this.optionInput.nativeElement.value = '';
      this.optionCtrl.setValue(null);
    });
  }

}

/**
 * @title Radio Button Component
 * 
 **/
@Component({
  selector: 'radio-ng-model',
  standalone: true,
  template: `<mat-radio-group aria-label="Select an option" [(ngModel)]="selectedOption" >
                <mat-radio-button value='Yes'>Yes</mat-radio-button>
                <mat-radio-button value='No'>No</mat-radio-button>
            </mat-radio-group>`,
  imports: [MatRadioModule, FormsModule, CommonModule, ReactiveFormsModule, ],
})
export class RadioNgModel {
  selectedOption = 'No';
}

/* Individual Dialog box content */

@Component({
  selector: 'individual-content-dialog',
  templateUrl: '././individual/add-record-individual-content.html',
  styleUrls: ['././individual/add-record-individual-content.css'],
  standalone: true,
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
    //AliasChipsInput,
    ChipsAutocompleteOption,
    MatRadioModule,
    //RadioNgModel,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    phoneFormatter
  ],
  
})
export class IndividualContentDialog {
  titleText: string = ""; 
  mode: string = "";
  constructor( private readonly router: Router,
    public dialogRef: MatDialogRef<IndividualContentDialog>, private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (data?.mode == "e"){ this.titleText = "Edit Record - Individual"; this.mode = "e"}
      else { this.titleText = "Add Record - Individual";}
    }

    today: Date = new Date();
    myFilter = (d: Date | null): boolean => {
      const date = d || new Date();
      return date <= this.today;
    };
    selectedDate: Date | null = null;
    
    form!: FormGroup

    showCalendar!:boolean

    showDisabilityList!: boolean

    disabilityList!: string;
    @ViewChildren(ChipsAutocompleteOption)
    chipsComponents!: QueryList<ChipsAutocompleteOption>;

    membership: string[] = [];
    disabilities: string[] = [];

      
    ngOnInit() {
      if (this.data?.mode != "e") {
        this.form = new FormGroup({
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          salutation: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          ethnicity: new FormControl(''),
          membership: new FormControl(''),
          gender: new FormControl(''),
          withheldDOB: new FormControl(false),
          formattedDOB: new FormControl<Date | null>({
            value: null,
            disabled: false
          }),
          dateOfBirth: new FormControl<Date | null>({
            value: null,
            disabled: false
          }),
          withheldAddress: new FormControl(false),
          addressInfo: new FormControl<string>({
            value: '',
            disabled: false
          }),
          addressInfo2: new FormControl<string>({
            value: '',
            disabled: false
          }),
          city: new FormControl<string>({
            value: '',
            disabled: false
          }),
          state: new FormControl<string>({
            value: '',
            disabled: false
          }),
          county: new FormControl(''),
          optNews: new FormControl(false),
          hasDisability: new FormControl('No'),
          disabilities: new FormControl(''),
        });
      } else {
        let addressExists = this.data.record?.addressLine1 == "" || this.data.record?.addressLine2 == "" || this.data.record?.city == "" || this.data.record?.state == "";
        
        this.form = new FormGroup({
          firstName: new FormControl(this.data.record?.firstName),
          lastName: new FormControl(this.data.record?.lastName),
          salutation: new FormControl(this.data.record?.salutation),
          email: new FormControl(this.data.record?.email),
          phone: new FormControl(this.data.record?.phone),
          ethnicity: new FormControl(this.data.record?.ethnicity),
          gender: new FormControl(this.data.record?.gender),
          withheldDOB: new FormControl( this.data.record?.dateOfBirth == null),
          dateOfBirth: new FormControl<Date | null>({
            value: this.data.record?.dateOfBirth || null,
            disabled: this.data.record?.dateOfBirth !== "" || false
          }),
          withheldAddress: new FormControl(addressExists),
          addressInfo: new FormControl<string>({
            value: this.data.record?.addressLine1,
            disabled: addressExists
          }),
          addressInfo2: new FormControl<string>({
            value: this.data.record?.addressLine2,
            disabled: addressExists
          }),
          city: new FormControl<string>({
            value: this.data.record?.city,
            disabled: addressExists
          }),
          state: new FormControl<string>({
            value: this.data.record?.state,
            disabled: addressExists
          }),
          county: new FormControl(this.data.record?.county),
          optNews: new FormControl(false),
          hasDisability: new FormControl((this.data.record?.disabilities != "") ? 'Yes' : 'No'),
        });

        this.showDisabilityList = this.form.get('hasDisability')?.value;
      }
      
      

      this.showCalendar = false;
      this.selectedDate = this.form.get('dateOfBirth')?.value ?? null;


      this.form.get('withheldDOB')?.valueChanges.subscribe(disabled => {
        const field = this.form.get('dateOfBirth')!;
        disabled ? field.disable() : field.enable();
      });
      this.form.get('withheldAddress')?.valueChanges.subscribe(disabled => {
        const fields = [this.form.get('addressInfo')!, this.form.get('addressInfo2')!, this.form.get('city')!,this.form.get('state')!] ;
        fields.forEach ( f => {disabled ? f.disable() : f.enable(); });
      });

      this.form.get('hasDisability')?.valueChanges.subscribe(value => {
        this.showDisabilityList = value === 'Yes';
      });
    }

    ngAfterViewInit() {
      const chipsArray = this.chipsComponents?.toArray() ?? [];

      if (this.data?.mode === 'e') {
        const membership = this.data.record?.membership?.split(', ') ?? [];
        const disabilities = this.data.record?.disabilities?.split(', ') ?? [];

        if (chipsArray[0]) {
          chipsArray[0].setOptions(membership);
        }

        if (chipsArray[1]) {
          chipsArray[1].setOptions(disabilities);
        }
      }
    }

    onDateChange(date: Date) {
        this.selectedDate = date;
      this.form.get('dateOfBirth')?.setValue(date);
    }
    asDate(value: any): Date | null {
      return value ? new Date(value) : null;
    }
    onCancelClick(): void {
      this.dialogRef.close();
    }

    addIndividualInfo(): void {
      if (this.mode != "e"){
        // TODO handle adding record to the db here
        //todo remove this later bc local storage changes
        let records = JSON.parse(localStorage.getItem('records') || '[]');

        let recordId = crypto.randomUUID();

        let membership = this.chipsComponents.toArray()[0]?.options.join(", ") || [];
        let disabilities = this.chipsComponents.toArray()[1]?.options.join(", ") || [];

        let newRecord = {
          active: false,
          addressLine1: this.form.get('addressInfo')!.value,
          addressLine2: this.form.get('addressInfo2')!.value,
          birthday: this.form.get('dateOfBirth')!.value,
          city: this.form.get('city')!.value,
          county: this.form.get('county')!.value,
          deceased: false,
          email: this.form.get('email')!.value,
          ethnicity: this.form.get('ethnicity')!.value,
          firstName: this.form.get('firstName')!.value,
          gender: this.form.get('gender')!.value,
          lastName: this.form.get('lastName')!.value,
          membership: membership,
          phone: this.form.get('phone')!.value,
          salutation: this.form.get('salutation')!.value,
          state: this.form.get('state')!.value,
          id: recordId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          disabilities: disabilities,
        };

        // 3. Push object into array
        records.push(newRecord);

        // 4. Save back properly
        localStorage.setItem('records', JSON.stringify(records));

        this.dialogRef.close();
        this.dialogRef.close();

        //handles navigation to view-record page
        try {
          this.router.navigate(['/view-record', 'individual', recordId])
        } catch (error) {
          console.error('Navigation error:', error);
        }
      } else {

        let membership = this.chipsComponents.toArray()[0]?.options.join(", ") || [];
        let disabilities = this.chipsComponents.toArray()[1]?.options.join(", ") || [];

        let editedRecord = {
          active: false,
          addressLine1: this.form.get('addressInfo')!.value,
          addressLine2: this.form.get('addressInfo2')!.value,
          birthday: this.form.get('dateOfBirth')!.value,
          city: this.form.get('city')!.value,
          county: this.form.get('county')!.value,
          deceased: false,
          email: this.form.get('email')!.value,
          ethnicity: this.form.get('ethnicity')!.value,
          firstName: this.form.get('firstName')!.value,
          gender: this.form.get('gender')!.value,
          lastName: this.form.get('lastName')!.value,
          membership: membership,
          phone: this.form.get('phone')!.value,
          salutation: this.form.get('salutation')!.value,
          state: this.form.get('state')!.value,
          id: this.data.record.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          disabilities: disabilities,
        };

        const stored = localStorage.getItem('records');
        const records = stored ? JSON.parse(stored) : [];

        //find the record that matches the id
        let record =  records.find((r: any) => r.id === this.data.record.id);
        let recordIndex = records.indexOf(record);

        records[recordIndex] = editedRecord

        localStorage.setItem('records', JSON.stringify(records));

        this.dialogRef.close();
        window.location.reload();
      }
    }
}

/* Organization Dialog box content */

@Component({
  selector: 'organization-content-dialog',
  templateUrl: '././organization/add-record-organization-content.html',
  styleUrls: ['././organization/add-record-organization-content.css'],
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
    MatRadioModule,
    RadioNgModel,
    ReactiveFormsModule,
    CommonModule,
    phoneFormatter
  ]
})
export class OrganizationContentDialog {
  titleText: string = "";
  mode: string = "";
  constructor( private readonly router: Router,
    public dialogRef: MatDialogRef<OrganizationContentDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any){
      if (data?.mode == "e"){ this.titleText = "Edit Record - Organization"; this.mode = "e"}
      else { this.titleText = "Add Record - Organization";}
    }

    form!: FormGroup;

    ngOnInit() {
      if (this.data?.mode != "e") {
        this.form = new FormGroup({
          name: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          addressInfo: new FormControl(''),
          addressInfo2: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
          county: new FormControl(''),
          repFirstName: new FormControl(''),
          repLastName: new FormControl(''),
          repPosition: new FormControl(''),
          repDepartment: new FormControl(''),
          // descServices: new FormControl(''),
          // eligReqs: new FormControl(''),
          // intakeProc: new FormControl(''),
          // FeesChg: new FormControl(''),
          // hrsOp: new FormControl(''),
          // other: new FormControl('')
        });
      } else {
        this.form = new FormGroup({
          name: new FormControl(this.data.orgRecord?.name),
          email: new FormControl(this.data.orgRecord?.email),
          phone: new FormControl(this.data.orgRecord?.phone),
          addressInfo: new FormControl(this.data.orgRecord?.addressLine1),
          addressInfo2: new FormControl(this.data?.orgRecord?.addressLine2),
          city: new FormControl(this.data.orgRecord?.city),
          state: new FormControl(this.data.orgRecord?.state),
          county: new FormControl(this.data.orgRecord?.county),
          repFirstName: new FormControl(this.data.orgRecord?.repFirstName),
          repLastName: new FormControl(this.data.orgRecord?.repLastName),
          repPosition: new FormControl(this.data.orgRecord?.repPosition),
          repDepartment: new FormControl(this.data.orgRecord?.repDepartment),
          // descServices: new FormControl(this.data.orgRecord?.descServices),
          // eligReqs: new FormControl(this.data.orgRecord?.eligReqs),
          // intakeProc: new FormControl(this.data.orgRecord?.intakeProc),
          // feesChg: new FormControl(this.data.orgRecord?.feesChg),
          // hrsOp: new FormControl(this.data.orgRecord?.hrsOp),
          // other: new FormControl(this.data.orgRecord?.other)
        });
      }

    }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    addOrganizationInfo(): void {
      if (this.mode != 'e'){
        console.log(this.mode)
        //todo remove the below code for localstorage changes
        let records = JSON.parse(localStorage.getItem('org-records') || '[]');

        let recordId = crypto.randomUUID();

        let newRecord = {
          name: this.form.get('name')!.value,
          phone: this.form.get('phone')!.value,
          email: this.form.get('email')!.value,
          addressLine1: this.form.get('addressInfo')!.value,
          addressLine2: this.form.get('addressInfo2')!.value,
          city: this.form.get('city')!.value,
          county: this.form.get('county')!.value,
          state: this.form.get('state')!.value,
          id: recordId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          repFirstName: this.form.get('repFirstName')!.value,
          repLastName: this.form.get('repLastName')!.value,
          repPosition: this.form.get('repPosition')!.value,
          repDepartment: this.form.get('repDepartment')!.value,
          // descServices: this.form.get('descServices')!.value,
          // eligReqs: this.form.get('eligReqs')!.value,
          // intakeProc: this.form.get('intakeProc')!.value,
          // feesChg: this.form.get('feesChg')!.value,
          // hrsOp: this.form.get('hrsOp')!.value,
          // other: this.form.get('other')!.value,
        };

        // 3. Push object into array
        records.push(newRecord);

        // 4. Save back properly
        localStorage.setItem('org-records', JSON.stringify(records));

        this.dialogRef.close();
        this.dialogRef.close();
      // handles navigation to view-record page
      try {
          this.router.navigate(['/view-record', 'organization', recordId])
        } catch (error) {
          console.error('Navigation error:', error);
        }

      } else {
        console.log("edit mode")
        let editedRecord = {
          name: this.form.get('name')!.value,
          phone: this.form.get('phone')!.value,
          email: this.form.get('email')!.value,
          addressLine1: this.form.get('addressInfo')!.value,
          addressLine2: this.form.get('addressInfo2')!.value,
          city: this.form.get('city')!.value,
          county: this.form.get('county')!.value,
          state: this.form.get('state')!.value,
          id: this.data.orgRecord.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          repFirstName: this.form.get('repFirstName')!.value,
          repLastName: this.form.get('repLastName')!.value,
          repPosition: this.form.get('repPosition')!.value,
          repDepartment: this.form.get('repDepartment')!.value,
          // descServices: this.form.get('descServices')!.value,
          // eligReqs: this.form.get('eligReqs')!.value,
          // intakeProc: this.form.get('intakeProc')!.value,
          // feesChg: this.form.get('feesChg')!.value,
          // hrsOp: this.form.get('hrsOp')!.value,
          // other: this.form.get('other')!.value,
        };

        const stored = localStorage.getItem('org-records');
        const records = stored ? JSON.parse(stored) : [];

        //find the record that matches the id
        let record =  records.find((r: any) => r.id === this.data.orgRecord.id);
        let recordIndex = records.indexOf(record);

        records[recordIndex] = editedRecord

        localStorage.setItem('org-records', JSON.stringify(records));

        this.dialogRef.close();
        window.location.reload();
      }
    }
}