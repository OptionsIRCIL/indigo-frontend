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
import { MatSelectModule } from '@angular/material/select';
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

interface CeoStorageForm {
  initialDate: string;
  numberOfPublications: number;
  personsWithDisabilities: number;
  generalPublic: number;
  category: string;
  futureReference: string;
  descriptionOfService: string;
  outcome: string;
  closedAt: string;
  createdAt: string;
  organization: string;
  id: string;
}

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
    MatButtonModule,
  ],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css',
})
export class CEOComponent {
  private readonly formStorageKey = 'ceo-forms';
  private readonly effortStoragePrefix = 'ceo-efforts:';
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

  categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  futureReferences: string[] = ['Reference A', 'Reference B', 'Reference C'];

  selectedCategories: string[] = [];
  selectedFutureReferences: string[] = [];

  categoryCtrl = new FormControl('');
  futureReferenceCtrl = new FormControl('');

  get filteredCategories(): string[] {
    const value = this.categoryCtrl.value?.toLowerCase() || '';
    return this.categories.filter(
      (c) => c.toLowerCase().includes(value) && !this.selectedCategories.includes(c)
    );
  }

  addCategory(value: string) {
    if (!this.selectedCategories.includes(value)) {
      this.selectedCategories.push(value);
      this.categoryCtrl.setValue('');
    }
  }

  removeCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
  }

  get filteredFutureReferences(): string[] {
    const value = this.futureReferenceCtrl.value?.toLowerCase() || '';
    return this.futureReferences.filter(
      (r) => r.toLowerCase().includes(value) && !this.selectedFutureReferences.includes(r)
    );
  }

  addFutureReference(value: string) {
    if (!this.selectedFutureReferences.includes(value)) {
      this.selectedFutureReferences.push(value);
      this.futureReferenceCtrl.setValue('');
    }
  }

  removeFutureReference(reference: string) {
    this.selectedFutureReferences = this.selectedFutureReferences.filter((r) => r !== reference);
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
  });

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d !== null && d <= today;
  };

  displayedColumns: string[] = ['date', 'employee', 'grant', 'type', 'hours', 'actions'];
  dataSource: EmployeeEffort[] = [];

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.recordType = this.route.snapshot.queryParamMap.get('recordType');
    this.recordId = this.route.snapshot.queryParamMap.get('recordId');

    if (this.config.demoMode && this.formId) {
      const existing = this.getStoredForms().find((f) => f.id === this.formId);
      if (existing) {
        this.ceoForm.patchValue({
          date: this.fromDateValue(existing.initialDate),
          numPublications: existing.numberOfPublications,
          numPersonsWithDisabilities: existing.personsWithDisabilities,
          numGeneralPublic: existing.generalPublic,
          futureReference: existing.futureReference,
          descriptionOfService: existing.descriptionOfService,
          outcome: existing.outcome,
        });

        this.selectedCategories = existing.category
          ? existing.category.split(',').map((v) => v.trim()).filter((v) => v.length > 0)
          : [];

        if (existing.organization) {
          this.recordType = 'organization';
          this.recordId = existing.organization;
        }
      }

      this.dataSource = this.getStoredEfforts(this.formId);
    }
  }

  addRow() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.dataSource = [...this.dataSource, result];
    });
  }

  editRow(row: EmployeeEffort, index: number) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { width: '400px', data: row });
    dialogRef.afterClosed().subscribe((result: EmployeeEffort | undefined) => {
      if (!result) return;
      const updated = [...this.dataSource];
      updated[index] = result;
      this.dataSource = updated;
    });
  }

  private getStoredForms(): CeoStorageForm[] {
    const stored = localStorage.getItem(this.formStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveStoredForms(forms: CeoStorageForm[]): void {
    localStorage.setItem(this.formStorageKey, JSON.stringify(forms));
  }

  private getStoredEfforts(formId: string): EmployeeEffort[] {
    const stored = localStorage.getItem(`${this.effortStoragePrefix}${formId}`);
    const rows: StoredEmployeeEffort[] = stored ? JSON.parse(stored) : [];
    return rows.map((r) => ({ ...r, date: new Date(r.date) }));
  }

  private saveStoredEfforts(formId: string, rows: EmployeeEffort[]): void {
    const payload: StoredEmployeeEffort[] = rows.map((r) => ({ ...r, date: r.date.toISOString() }));
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

      const payload: CeoStorageForm = {
        initialDate: this.toDateValue(this.ceoForm.value.date),
        numberOfPublications: this.ceoForm.value.numPublications ?? 0,
        personsWithDisabilities: this.ceoForm.value.numPersonsWithDisabilities ?? 0,
        generalPublic: this.ceoForm.value.numGeneralPublic ?? 0,
        category: this.selectedCategories.join(', '),
        futureReference: this.selectedFutureReferences.join(', '),
        descriptionOfService: this.ceoForm.value.descriptionOfService ?? '',
        outcome: this.ceoForm.value.outcome ?? '',
        closedAt: existing?.closedAt ?? '',
        createdAt: existing?.createdAt ?? now,
        organization: this.recordType === 'organization' ? (this.recordId ?? '') : (existing?.organization ?? ''),
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
    this.ceoForm.reset();
    this.selectedCategories = [];
    this.selectedFutureReferences = [];
    this.navigateBackToRecord();
  }
}

