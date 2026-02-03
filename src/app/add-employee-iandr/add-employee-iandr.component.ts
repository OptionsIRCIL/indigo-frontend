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

@Component({
  selector: 'app-add-employee-iandr',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './add-employee-iandr.component.html',
  styleUrl: './add-employee-iandr.component.css',
})
export class AddEmployeeIandrComponent {
  constructor(
    private dialogRef: MatDialogRef<AddEmployeeIandrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  if (data) {
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

  newEmployee!: string;
  newGrant!: string;
  newType!: string;
  newHours!: number;

  addEmployee() {
    this.dialogRef.close({
      employee: this.newEmployee,
      grant: this.newGrant,
      type: this.newType,
      hours: this.newHours,
    });
  }
  close() {
    this.dialogRef.close();
  }
}
