import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-employee',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  if (data) {
    this.newDate = data.date ? new Date(data.date) : new Date();
    this.newEmployee = data.employee ?? '';
    this.newGrant = data.grant ?? '';
    this.newType = data.type ?? '';
    this.newHours = data.hours ?? 0;
  }
}

  employees: string[] = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
  ];
  grants: string[] = [
    'Grant A',
    'Grant B',
    'Grant C',
  ];
  types: string[] = [
    'A',
    'B',
    'C',
  ];

  newDate: Date = new Date();
  newEmployee!: string;
  newGrant!: string;
  newType!: string;
  newHours!: number;

  addEmployee() {
    this.dialogRef.close({
      date: this.newDate,
      employee: this.newEmployee,
      grant: this.newGrant,
      type: this.newType,
      hours: this.newHours,
    });
  }

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return d !== null && d <= today;
  }

  close() {
    this.dialogRef.close();
  }
}
