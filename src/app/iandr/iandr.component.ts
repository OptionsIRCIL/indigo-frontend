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
}
