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
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

export interface EmployeeEffort {
  date: Date;
  employee: string;
  grant: string;
  type: string;
  hours: number;
}

interface StoredEmployeeEffort {
  date: string;
  employee: string;
  grant: string;
  type: string;
  hours: number;
}

interface CifStorageForm {
  csrFileNumber: string;
  primaryEmployee: string;
  currentStatus: string;
  dateOfBirth: string;
  activationDate: string;
  closureDate: string;
  createdAt: string;
  closedAt: string;
  deceased: boolean;
  intake: string;
  exit: string;
  county: string;
  independentLivingPlanActivity: string;
  dateofILPAction: string;
  individual: string;
  id: string;
}

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
  private readonly formStorageKey = 'cif-forms';
  private readonly effortStoragePrefix = 'cif-efforts:';
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

  statusOptions: string[] = ['Open', 'Pending', 'Closed'];

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

  intakeOptions: string[] = ['Phone', 'Walk-in', 'Referral'];
  exitOptions: string[] = ['Completed', 'Transferred', 'Withdrawn'];

  displayedColumns: string[] = ['date', 'employee', 'grant', 'type', 'hours', 'actions'];
  dataSource: EmployeeEffort[] = [];

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.recordType = this.route.snapshot.queryParamMap.get('recordType');
    this.recordId = this.route.snapshot.queryParamMap.get('recordId');

    if (this.config.demoMode && this.formId) {
      const existing = this.getStoredForms().find((f) => f.id === this.formId);
      if (existing) {
        this.consumerForm.patchValue({
          csrFileNumber: String(existing.csrFileNumber),
          currentStatus: existing.currentStatus,
          activationDate: this.fromDateValue(existing.activationDate),
          closureDate: this.fromDateValue(existing.closureDate),
          independentLivingPlanActivity: existing.independentLivingPlanActivity,
          ilpActionDate: this.fromDateValue(existing.dateofILPAction),
          primaryEmployee: existing.primaryEmployee,
          dateOfBirth: this.fromDateValue(existing.dateOfBirth),
          deceased: existing.deceased,
          intake: existing.intake,
          exit: existing.exit,
          county: existing.county,
        });

        if (existing.individual) {
          this.recordType = 'individual';
          this.recordId = existing.individual;
        }
      }

      this.dataSource = this.getStoredEfforts(this.formId);
    }
  }

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date <= this.today;
  };

  addRow() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.dataSource = [...this.dataSource, result];
    });
  }

  editRow(row: EmployeeEffort, index: number) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { data: row });
    dialogRef.afterClosed().subscribe((result: EmployeeEffort | undefined) => {
      if (!result) return;
      const updated = [...this.dataSource];
      updated[index] = result;
      this.dataSource = updated;
    });
  }

  private getStoredForms(): CifStorageForm[] {
    const stored = localStorage.getItem(this.formStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveStoredForms(forms: CifStorageForm[]): void {
    localStorage.setItem(this.formStorageKey, JSON.stringify(forms));
  }

  private getStoredEfforts(formId: string): EmployeeEffort[] {
    const stored = localStorage.getItem(`${this.effortStoragePrefix}${formId}`);
    const rows: StoredEmployeeEffort[] = stored ? JSON.parse(stored) : [];
    return rows.map((r) => ({ ...r, date: new Date(r.date) }));
  }

  private saveStoredEfforts(formId: string, rows: EmployeeEffort[]): void {
    const payload: StoredEmployeeEffort[] = rows.map((r) => ({
      ...r,
      date: r.date.toISOString(),
    }));
    localStorage.setItem(`${this.effortStoragePrefix}${formId}`, JSON.stringify(payload));
  }

  private toDateValue(value: Date | null | undefined): string {
    if (!value) return '';
    return new Date(value).toISOString().split('T')[0];
  }

  private fromDateValue(value: string): Date | null {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
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
      const existing = forms.find((f) => f.id === resolvedId);

      const payload: CifStorageForm = {
        csrFileNumber: this.consumerForm.value.csrFileNumber ?? '',
        primaryEmployee: this.consumerForm.value.primaryEmployee ?? '',
        currentStatus: this.consumerForm.value.currentStatus ?? '',
        dateOfBirth: this.toDateValue(this.consumerForm.value.dateOfBirth),
        activationDate: this.toDateValue(this.consumerForm.value.activationDate),
        closureDate: this.toDateValue(this.consumerForm.value.closureDate),
        createdAt: existing?.createdAt ?? now,
        closedAt: this.toDateValue(this.consumerForm.value.closureDate),
        deceased: this.consumerForm.value.deceased ?? false,
        intake: this.consumerForm.value.intake ?? '',
        exit: this.consumerForm.value.exit ?? '',
        county: this.consumerForm.value.county ?? '',
        independentLivingPlanActivity: this.consumerForm.value.independentLivingPlanActivity ?? '',
        dateofILPAction: this.toDateValue(this.consumerForm.value.ilpActionDate),
        individual: this.recordType === 'individual' ? (this.recordId ?? '') : (existing?.individual ?? ''),
        id: resolvedId,
      };

      const index = forms.findIndex((f) => f.id === resolvedId);
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
    this.consumerForm.reset();
    this.navigateBackToRecord();
  }
}
