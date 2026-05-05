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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

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

  interface IandrStorageForm {
    createdAt: string;
    date: string;
    department: string;
    employeeId: string;
    formDate: string;
    grant: string;
    id: string;
    organizationId: string;
    outcome: string;
    personId: string;
    referrer: string;
    serviceRequest: string;
    serviceType: string;
    updatedAt: string;
  }

interface StoredEmployeeEffort {
  date: string;
  employee: string;
  grant: string;
  type: string;
  hours: number;
}

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
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './iandr.component.html',
  styleUrl: './iandr.component.css',
})

export class IandrComponent {

  private readonly formStorageKey = 'iAndR-forms';
  private readonly effortStoragePrefix = 'iAndR-efforts:';
  private formId: string | null = null;
  private recordType: string | null = null;
  private recordId: string | null = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}
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

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.recordType = this.route.snapshot.queryParamMap.get('recordType');
    this.recordId = this.route.snapshot.queryParamMap.get('recordId');

    if (this.config.demoMode && this.formId) {
      const existing = this.getStoredForms().find((form) => form.id === this.formId);
      if (existing) {
        this.iandrForm.patchValue({
          date: existing.date ? new Date(existing.date) : this.today,
          regarding: existing.serviceRequest,
          outcome: existing.outcome,
        });

        this.selectedCategories = existing.serviceType
          ? existing.serviceType.split(',').map((value) => value.trim()).filter((value) => value.length > 0)
          : [];

        if (existing.personId) {
          this.recordType = 'individual';
          this.recordId = existing.personId;
        } else if (existing.organizationId) {
          this.recordType = 'organization';
          this.recordId = existing.organizationId;
        }
      }

      this.dataSource = this.getStoredEfforts(this.formId);
    }

    if (this.config.demoMode && !this.formId) {
      this.dataSource = [];
    }
  }

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
      data: row,
    });

    dialogRef.afterClosed().subscribe((result: EmployeeEffort | undefined) => {
      if (!result) return;
      const updated = [...this.dataSource];
      updated[index] = result;
      this.dataSource = updated;
    });
  }

  private getStoredForms(): IandrStorageForm[] {
    const storedForms = localStorage.getItem(this.formStorageKey);
    return storedForms ? JSON.parse(storedForms) : [];
  }

  private saveStoredForms(forms: IandrStorageForm[]): void {
    localStorage.setItem(this.formStorageKey, JSON.stringify(forms));
  }

  private getStoredEfforts(formId: string): EmployeeEffort[] {
    const key = `${this.effortStoragePrefix}${formId}`;
    const stored = localStorage.getItem(key);
    const rows: StoredEmployeeEffort[] = stored ? JSON.parse(stored) : [];

    return rows.map((row) => ({
      ...row,
      date: new Date(row.date),
    }));
  }

  private saveStoredEfforts(formId: string, rows: EmployeeEffort[]): void {
    const key = `${this.effortStoragePrefix}${formId}`;
    const payload: StoredEmployeeEffort[] = rows.map((row) => ({
      ...row,
      date: row.date.toISOString(),
    }));

    localStorage.setItem(key, JSON.stringify(payload));
  }

  private getDateValue(): string {
    const value = this.iandrForm.value.date;
    if (!value) {
      return '';
    }

    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }

  private navigateBackToRecord(): void {
    if (this.recordType && this.recordId) {
      this.router.navigate(['/view-record', this.recordType, this.recordId]);
      return;
    }

    this.router.navigate(['/']);
  }

  onSave(): void {
    if (this.config.demoMode) {
      const now = new Date().toISOString();
      const forms = this.getStoredForms();

      const resolvedId = this.formId ?? crypto.randomUUID();
      const existing = forms.find((form) => form.id === resolvedId);

      const payload: IandrStorageForm = {
        createdAt: existing?.createdAt ?? now,
        date: this.getDateValue(),
        department: existing?.department ?? '',
        employeeId: this.dataSource[0]?.employee ?? existing?.employeeId ?? '',
        formDate: this.getDateValue(),
        grant: this.dataSource[0]?.grant ?? existing?.grant ?? '',
        id: resolvedId,
        organizationId: this.recordType === 'organization' ? (this.recordId ?? '') : '',
        outcome: this.iandrForm.value.outcome ?? '',
        personId: this.recordType === 'individual' ? (this.recordId ?? '') : '',
        referrer: existing?.referrer ?? '',
        serviceRequest: this.iandrForm.value.regarding ?? '',
        serviceType: this.selectedCategories.join(', '),
        updatedAt: now,
      };

      const index = forms.findIndex((form) => form.id === resolvedId);
      if (index >= 0) {
        forms[index] = payload;
      } else {
        forms.push(payload);
      }

      this.saveStoredForms(forms);
      this.saveStoredEfforts(resolvedId, this.dataSource);
      this.formId = resolvedId;
    }

    this.navigateBackToRecord();
  }

  onCancel(): void {
    this.iandrForm.reset();
    this.navigateBackToRecord();
  }
}
