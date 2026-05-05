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
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

interface GoalsStorageForm {
  estimatedCompletionDate: string;
  initialDate: string;
  closedAt: string;
  createdAt: string;
  futureReference: string;
  goalStatus: string;
  type: string;
  grant?: string;
  goalOutcome: string;
  individual: string;
  goalDescription: string;
  outcomeDescription: string;
  id: string;
}

@Component({
  selector: 'app-goals',
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
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
})
export class GoalsComponent {
  private readonly storageKey = 'goals-forms';
  private formId: string | null = null;
  private recordType: string | null = null;
  private recordId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}
  today = new Date(new Date().setHours(0, 0, 0, 0));

  goalsForm = new FormGroup({
    initialDate: new FormControl<Date | null>(null),
    type: new FormControl(''),
    futureReference: new FormControl(''),
    grant: new FormControl(''),
    goalStatus: new FormControl(''),
    estCompletionDate: new FormControl<Date | null>(null),
    outcome: new FormControl(''),
    outcomeDescription: new FormControl(''),
    completionDate: new FormControl<Date | null>(null),
    goalDescription: new FormControl(''),
  });

  typeOptions = ['Type 1', 'Type 2', 'Type 3'];
  futureReferenceOptions = ['Reference A', 'Reference B', 'Reference C'];
  grantOptions = ['Grant A', 'Grant B', 'Grant C'];
  goalStatusOptions = ['Not Started', 'In Progress', 'Completed'];
  outcomeOptions = ['Outcome A', 'Outcome B', 'Outcome C'];

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.recordType = this.route.snapshot.queryParamMap.get('recordType');
    this.recordId = this.route.snapshot.queryParamMap.get('recordId');

    if (!this.config.demoMode || !this.formId) {
      return;
    }

    const existing = this.getStoredForms().find((form) => form.id === this.formId);
    if (!existing) {
      return;
    }

    this.goalsForm.patchValue({
      initialDate: this.fromDateValue(existing.initialDate),
      type: existing.type,
      futureReference: existing.futureReference,
      grant: existing.grant ?? '',
      goalStatus: existing.goalStatus,
      estCompletionDate: this.fromDateValue(existing.estimatedCompletionDate),
      outcome: existing.goalOutcome,
      outcomeDescription: existing.outcomeDescription,
      completionDate: this.fromDateValue(existing.closedAt),
      goalDescription: existing.goalDescription,
    });

    if (existing.individual) {
      this.recordType = 'individual';
      this.recordId = existing.individual;
    }
  }

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date <= this.today;
  };

  futureDateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date >= this.today;
  };

  private getStoredForms(): GoalsStorageForm[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveStoredForms(forms: GoalsStorageForm[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(forms));
  }

  private toDateValue(value: Date | null | undefined): string {
    if (!value) {
      return '';
    }

    return new Date(value).toISOString().split('T')[0];
  }

  private fromDateValue(value: string): Date | null {
    if (!value) {
      return null;
    }

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
      const existing = forms.find((form) => form.id === resolvedId);

      const payload: GoalsStorageForm = {
        estimatedCompletionDate: this.toDateValue(this.goalsForm.value.estCompletionDate),
        initialDate: this.toDateValue(this.goalsForm.value.initialDate),
        closedAt: this.toDateValue(this.goalsForm.value.completionDate),
        createdAt: existing?.createdAt ?? now,
        futureReference: this.goalsForm.value.futureReference ?? '',
        goalStatus: this.goalsForm.value.goalStatus ?? '',
        type: this.goalsForm.value.type ?? '',
        grant: this.goalsForm.value.grant ?? '',
        goalOutcome: this.goalsForm.value.outcome ?? '',
        individual: this.recordType === 'individual' ? (this.recordId ?? '') : (existing?.individual ?? ''),
        goalDescription: this.goalsForm.value.goalDescription ?? '',
        outcomeDescription: this.goalsForm.value.outcomeDescription ?? '',
        id: resolvedId,
      };

      const index = forms.findIndex((form) => form.id === resolvedId);
      if (index >= 0) {
        forms[index] = payload;
      } else {
        forms.push(payload);
      }

      this.saveStoredForms(forms);
      this.formId = resolvedId;
    }

    this.navigateBackToRecord();
  }

  onCancel(): void {
    this.goalsForm.reset();
    this.navigateBackToRecord();
  }
}
