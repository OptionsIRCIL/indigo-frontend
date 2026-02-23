import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatSelectModule } from '@angular/material/select';


  export interface EmployeeEffort {
    date: Date;
    employee: string;
    grant: string;
    type: string;
    hours: number;
  }

  const EMPLOYEE_DATA: EmployeeEffort[] = [
    {date: new Date('2025-02-02'), employee: 'Daisy Codenys', grant: 'Grant A', type: 'Type 1', hours: 10.5},
    {date: new Date('2025-02-03'), employee: 'John Doe', grant: 'Grant B', type: 'Type 2', hours: 15.25},
    {date: new Date('2025-02-04'), employee: 'Jane Smith', grant: 'Grant C', type: 'Type 1', hours: 20.75},
    {date: new Date('2025-02-05'), employee: 'Alice Johnson', grant: 'Grant A', type: 'Type 3', hours: 8},
  ];

@Component({
  selector: 'app-ceo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css',
})
export class CEOComponent {
  constructor(private dialog: MatDialog) {}
    today = new Date(new Date().setHours(0, 0, 0, 0));
  
    categories: string[] = [
      'Category 1',
      'Category 2',
      'Category 3',
      'Category 4',
    ];

    futureReferences: string[] = [
      'Reference A',
      'Reference B',
      'Reference C',
    ];
  
    selectedCategories: string[] = [];
    selectedFutureReferences: string[] = [];
  
    categoryCtrl = new FormControl('');
    futureReferenceCtrl = new FormControl('');
  
    get filteredCategories(): string[] {
      const value = this.categoryCtrl.value?.toLowerCase() || '';
      return this.categories.filter(
        c =>
          c.toLowerCase().includes(value) &&
          !this.selectedCategories.includes(c)
      );
    }
  
    addCategory(value: string) {
      if (!this.selectedCategories.includes(value)) {
        this.selectedCategories.push(value);
        this.categoryCtrl.setValue('');
      }
    }
  
    removeCategory(category: string) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }

    get filteredFutureReferences(): string[] {
      const value = this.futureReferenceCtrl.value?.toLowerCase() || '';
      return this.futureReferences.filter(
        r =>
          r.toLowerCase().includes(value) &&
          !this.selectedFutureReferences.includes(r)
      );
    }

    addFutureReference(value: string) {
      if (!this.selectedFutureReferences.includes(value)) {
        this.selectedFutureReferences.push(value);
        this.futureReferenceCtrl.setValue('');
      }
    }

    removeFutureReference(reference: string) {
      this.selectedFutureReferences = this.selectedFutureReferences.filter(r => r !== reference);
    }

    ceoForm = new FormGroup({
      date: new FormControl<Date | null>(this.today),
      category: new FormControl<string[]>([]),
      futureReference: new FormControl<string>(''),
      numPublications: new FormControl<number>(0),
      numPersonsWithDisabilities: new FormControl<number>(0),
      numGeneralPublic: new FormControl<number>(0),
      descriptionOfService: new FormControl<string>(''),
      outcome: new FormControl<string>(''),
    })
  
    myFilter = (d: Date | null): boolean => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      return d !== null && d <= today;
    }
  
    displayedColumns: string[] = ['date', 'employee', 'grant', 'type', 'hours', 'actions'];
    dataSource: EmployeeEffort[] = [...EMPLOYEE_DATA];
  
    addRow() {
      const dialogRef = this.dialog.open(AddEmployeeComponent, {
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (!result) return;
        this.dataSource = [...this.dataSource, result];
      });
    }
  
    editRow(row: EmployeeEffort, index: number) {
      const dialogRef = this.dialog.open(AddEmployeeComponent, {
        width: '400px',
        data: row,
      });
  
      dialogRef.afterClosed().subscribe((result: EmployeeEffort | undefined) => {
        if (!result) return;
        const updated = [...this.dataSource];
        updated[index] = result;
        this.dataSource = updated;
      });
    }
}

