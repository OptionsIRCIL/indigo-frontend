import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

  export interface EmployeeEffort {
    name: string;
    grant: string;
    type: string;
    hours: number;
  }

  const EMPLOYEE_DATA: EmployeeEffort[] = [
    {name: 'Daisy Codenys', grant: 'Grant A', type: 'Type 1', hours: 10.5},
    {name: 'John Doe', grant: 'Grant B', type: 'Type 2', hours: 15.25},
    {name: 'Jane Smith', grant: 'Grant C', type: 'Type 1', hours: 20.75},
    {name: 'Alice Johnson', grant: 'Grant A', type: 'Type 3', hours: 8},
  ];

@Component({
  selector: 'app-iandr',
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
  ],
  templateUrl: './iandr.component.html',
  styleUrl: './iandr.component.css',
})

export class IandrComponent {

  today = new Date(new Date().setHours(0, 0, 0, 0));

  categories: string[] = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
  ];

  selectedCategories: string[] = [];

  categoryCtrl = new FormControl('');

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

  iandrForm = new FormGroup({
    date: new FormControl<Date | null>(this.today),
    category: new FormControl<string[]>([]),
    regarding: new FormControl<string>(''),
    outcome: new FormControl<string>(''),
  })

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return d !== null && d <= today;
  }

  displayedColumns: string[] = ['name', 'grant', 'type', 'hours'];
  dataSource: EmployeeEffort[] = [...EMPLOYEE_DATA];

  addRow() {
    const newRow: EmployeeEffort = {
      name: '',
      grant: '',
      type: '',
      hours: 0,
    };
    this.dataSource = [...this.dataSource, newRow];
  }
}
