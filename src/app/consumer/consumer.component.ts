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
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
  selector: 'app-consumer-information-file',
  standalone: true,
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
    MatButtonModule,
  ],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.css',
})
export class ConsumerInformationFileComponent {
  constructor(private dialog: MatDialog, private router: Router) {}
  today = new Date(new Date().setHours(0, 0, 0, 0));

  consumerForm = new FormGroup({
    csrFileNumber: new FormControl(''),
    currentStatus: new FormControl(''),
    activationDate: new FormControl<Date | null>(null),
    closureDate: new FormControl<Date | null>(null),
    independentLivingPlanActivity: new FormControl(''),
    ilpActionDate: new FormControl<Date | null>(null),
    primaryEmployee: new FormControl(''),
    dateOfBirth: new FormControl<Date | null>(null),
    deceased: new FormControl(false),
    intake: new FormControl(''),
    exit: new FormControl(''),
    county: new FormControl(''),
  });

  statusOptions: string[] = [
    'Open',
    'Pending',
    'Closed',
  ];

  independentLivingPlanActivityOptions: string[] = [
    'Created',
    'Updated',
    'Reviewed',
    'Completed',
  ];

  primaryEmployeeOptions: string[] = [
    'Daisy Codenys',
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ];

  intakeOptions: string[] = [
    'Phone',
    'Walk-in',
    'Referral',
  ];

  exitOptions: string[] = [
    'Completed',
    'Transferred',
    'Withdrawn',
  ];

  displayedColumns: string[] = ['date', 'employee', 'grant', 'type', 'hours', 'actions'];

  dataSource = [...EMPLOYEE_DATA];

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date <= this.today;
  };

  addRow() {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (!result) return;
          this.dataSource = [...this.dataSource, result];
        });
      }
    
  editRow(row: EmployeeEffort, index: number) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result: EmployeeEffort | undefined) => {
      if (!result) return;
      const updated = [...this.dataSource];
      updated[index] = result;
      this.dataSource = updated;
    });
  }

  onSave(): void {
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.consumerForm.reset();
    this.router.navigate(['/']);
  }
}
