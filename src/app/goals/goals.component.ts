import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-goals',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
})
export class GoalsComponent {
  constructor(private dialog: MatDialog) {}
  today = new Date(new Date().setHours(0, 0, 0, 0));

  goalsForm = new FormGroup({
    initialDate: new FormControl<Date | null>(null),
    type: new FormControl(''),
    futureReference: new FormControl(''),
  });

  typeOptions = ['Type 1', 'Type 2', 'Type 3'];
  futureReferenceOptions = ['Reference A', 'Reference B', 'Reference C'];

    myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date <= this.today;
  };

}
