import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { AccessClientService } from "../../service/client/access-client.service";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import {
	IndividualContentDialog,
	OrganizationContentDialog,
} from "../main-dashboard/add-record/add-record.component";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenState } from "../../service/state/token-state.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
	AddFormContentDialog,
	AddAttachmentContentDialog,
} from "./add-form-or-attachment/add-form-or-attachment.component";
import { OpenFormsService } from "./open-forms.service";
import { ConfigService } from "../../config/config.service";
import { PersonClientService } from "../../service/client/person-client.service";
import { RecordIdState } from "../../service/state/record-id-state.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

interface InformationAndReferralForm {
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

interface GoalsForm {
	estimatedCompletionDate: string;
	initialDate: string;
	closedAt: string;
	createdAt: string;
	futureReference: string; //enum
	goalStatus: string; // enum
	type: string; //enum
	goalOutcome: string;
	individual: string; // Individual type
	goalDescription: string;
	outcomeDescription: string;
	id: string;
}

interface ComsumerInformationFileForm {
	createdAt: string;
	closedAt: string;
	csrFileNumber: string;
	primaryEmployee: string;
	currentStatus: string;
	dateOfBirth: string;
	activationDate: string;
	closureDate: string;
	deceased: boolean;
	intake: string;
	exit: string;
	county: string;
	independentLivingPlanActivity: string;
	dateOfILPAction: string;
	individual: string;
	id: string;
}

interface CommunityEducationAndOutreachForm {
	initialDate: string;
	numberOfPublications: number;
	personsWithDisabilities: number;
	generalPublic: number;
	category: string;
	futureReference: string; //enum
	descriptionOfService: string;
	outcome: string;
	closedAt: string;
	createdAt: string;
	organization: string;
	id: string;
}

@Component({
	selector: "app-view-record",
	imports: [
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatChipsModule,
		MatExpansionModule,
		MatCardModule,
		MatSelectModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		ReactiveFormsModule,
	],
	templateUrl: "./view-record-individual.component.html",
	styleUrl: "./view-record.component.css",
	providers: [OpenFormsService],
})
export class IndividualViewRecordComponent {
	private _Activatedroute: any;
	private sub: any;
	currentRecordId: string = "";
  tab: string = "information-and-referral";
  form!: FormGroup;

	record!: any; // mismatch between record's type and Person
  /*
  {
    firstName: string,
    lastName: string,
    salutation?: string,
    email?: string,
    phone?: string,
    ethnicity?: string,
    membership?: string,
    gender?: string,
    withheldDOB?: boolean,
    optNews?: boolean,
    dateOfBirth?: string,
    withheldAddress?: boolean,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    state?: string,
    county?: string,
    disabilities?: string,
  }
  */

	recordFormsList!: {
		informationAndReferrals: InformationAndReferralForm[];
		goals: GoalsForm[];
		consumerInformationFiles: ComsumerInformationFileForm[];
	};

	public constructor(
		private dialog: MatDialog,
		_Activatedroute: ActivatedRoute,
		private route: ActivatedRoute,
		private router: Router,
		private readonly accessClient: AccessClientService,
		protected readonly tokenState: TokenState,
		private readonly snackBar: MatSnackBar,
		private openFormsService: OpenFormsService,
		private config: ConfigService,
		private personClientService: PersonClientService,
    private recordIdState: RecordIdState,
    private fb: FormBuilder,
	) {}

	populateForms(id: string) {
		this.recordFormsList.informationAndReferrals =
			this.getInformationAndReferralForms(id);
		this.recordFormsList.goals = this.getGoalsForms(id);
		this.recordFormsList.consumerInformationFiles =
			this.getConsumerInformationFileForms(id);
	}

	handleFormClick(formChar: string, formId: string) {
		switch (formChar) {
			case "i":
				this.openFormsService.openExistingForm(
					"i",
					formId,
					"individual",
					this.currentRecordId,
				);
				break;
			case "g":
				this.openFormsService.openExistingForm(
					"g",
					formId,
					"individual",
					this.currentRecordId,
				);
				break;
			case "c":
				this.openFormsService.openExistingForm(
					"c",
					formId,
					"individual",
					this.currentRecordId,
				);
				break;
		}
	}

	ngOnInit() {
		// get the id from the route
		const id = this.route.snapshot.paramMap.get("id");
		this.currentRecordId = this.recordIdState.recordId; // id ?? "";
    this.tab = "information-and-referral";

		if (this.config.demoMode == true) {
			const stored = localStorage.getItem("records");
			const records = stored ? JSON.parse(stored) : [];
			//find the record that matches the id
			this.record = records.find((r: any) => r.id === id);
		} else {
			this.personClientService.getPerson(this.currentRecordId).subscribe((data) => {
				this.record = data;
        this.form = new FormGroup({
          notes: new FormControl(this.record.notes),
        });
        console.log(data);
			});
		}

		if (!this.recordFormsList) {
			this.recordFormsList = {
				informationAndReferrals: [],
				goals: [],
				consumerInformationFiles: [],
			};
		}
    if (this.config.demoMode == true) {
			if (id != null) {
				this.populateForms(id);
			}
  	}
	}
	openEditRecord(mode: string) {
		return this.dialog.open(IndividualContentDialog, {
			width: "fit-content",
			height: "fit-content",
			maxWidth: "90vw",
			maxHeight: "90vh",
			panelClass: "custom-dialog",
			data: {
				mode,
				record: this.record,
			},
		});
	}

  onTabChange(event: MatTabChangeEvent) {
    this.tab = event.tab.ariaLabelledby;
  }

	openAddForm(message?: string) {
		let url = this.router.serializeUrl(
			this.router.createUrlTree(["/error", "not-found"]),
		);

		const queryParams = { recordType: "individual", recordId: this.currentRecordId }

		switch (this.tab) {
			case "information-and-referral":
				url = this.router.serializeUrl(
					this.router.createUrlTree(["/information-and-referral"], {
						queryParams,
					}),
				);
				break;
			case "goals":
				url = this.router.serializeUrl(
					this.router.createUrlTree(["/goals"], { queryParams }),
				);
				break;
			case "consumer-information-file":
				url = this.router.serializeUrl(
					this.router.createUrlTree(["/consumer-information-file"], {
						queryParams,
					}),
				);
				break;
			default:
				break;
		}

		try {
			this.router.navigateByUrl(url);
		} catch (error) {
			console.error("Navigation error:", error);
		}
	}

	openAddAttachment() {
		return this.dialog.open(AddAttachmentContentDialog, {
			width: "fit-content",
			height: "fit-content",
			maxWidth: "90vw",
			maxHeight: "90vh",
			panelClass: "custom-dialog",
			data: {},
		});
	}

	/*
   Form get functions  (forms retrieved by personId)
  */
	getInformationAndReferralForms(personId: string) {
		personId != "" ? "" : console.log("No Forms Found.");
    const storedForms = localStorage.getItem("iAndR-forms");
    const forms = storedForms ? JSON.parse(storedForms) : [];
    return forms.filter((r: any) => r.personId === personId);
		return [];
	}

	getGoalsForms(personId: string) {
		personId != "" ? "" : console.log("No Forms Found.");
    const storedForms = localStorage.getItem("goals-forms");
    const forms = storedForms ? JSON.parse(storedForms) : [];
    return forms.filter((r: any) => r.individual === personId);
		return [];
	}

	getConsumerInformationFileForms(personId: string) {
		personId != "" ? "" : console.log("No Forms Found.");
    const storedForms = localStorage.getItem("cif-forms");
    const forms = storedForms ? JSON.parse(storedForms) : [];
    return forms.filter((r: any) => r.individual === personId);
		return [];
	}

	saveNotes() {
    this.record.notes = this.form.get("notes")?.value ?? ""

    let updatedRecord = {
      active: this.record.active,
      addressLine1: this.record.addressLine1,
      addressLine2: this.record.addressLine2,
      birthday: this.record.birthday,
      city: this.record.city,
      county: this.record.county,
      deceased: this.record.deceased,
      email: this.record.email,
      ethnicity: this.record.ethnicity,
      firstName: this.record.firstName,
      gender: this.record.gender,
      lastName: this.record.lastName,
      /*membership: membership,*/
      phone: this.record.phone,
      salutation: this.record.salutation,
      state: this.record.state,
      /*disabilities: disabilities,*/
      notes: this.record.notes
    };

		try {
      this.personClientService.putPerson(this.recordIdState.recordId, updatedRecord).subscribe((data) => {
					console.log(data);
      });
			this.snackBar.open("Notes saved", "", { duration: 2000 });
		} catch (error) {
			console.error("Notes not saved: ", error);
		}
	}
}

@Component({
	selector: "app-view-record",
	imports: [
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatChipsModule,
		MatExpansionModule,
		MatCardModule,
		MatSelectModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
	],
	templateUrl: "./view-record-organization.component.html",
	styleUrl: "./view-record.component.css",
})
export class OrganizationViewRecordComponent {
	currentRecordId: string = "";
  tab: string = "information-and-referral";

	orgRecord!: {
		name: string;
		email: string;
		phone: string;
		addressLine1: string;
		addressLine2: string;
		city: string;
		state: string;
		county: string;
		id: string;
		createdAt: Date;
		updatedAt: Date;
		repFirstName: string;
		repLastName: string;
		repPosition: string;
		repDepartment: string;
		// descServices: string,
		// eligReqs: string,
		// intakeProc: string,
		// FeesChg: string,
		// hrsOp: string,
		// other: string,
	};

	recordFormsList!: {
		informationAndReferrals: InformationAndReferralForm[];
		communityEducationAndOutreaches: CommunityEducationAndOutreachForm[];
	};

	public constructor(
		private dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
		private readonly snackBar: MatSnackBar,
		private openFormsService: OpenFormsService,
		private config: ConfigService,
	) {}

	populateForms(id: string) {
		this.recordFormsList.informationAndReferrals = this.getInformationAndReferralForms(id);
	  this.recordFormsList.communityEducationAndOutreaches = this.getCommunityEducationAndutreachForms(id);
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get("id");
		this.currentRecordId = id ?? "";

    const orgStored = localStorage.getItem("org-records");
    const orgRecords = orgStored ? JSON.parse(orgStored) : [];
    this.orgRecord = orgRecords.find((r: any) => r.id === id);

		if (!this.recordFormsList) {
			this.recordFormsList = {
				informationAndReferrals: [],
				communityEducationAndOutreaches: [],
			};
		}

		if (id != null) {
			this.populateForms(id);
		}
	}

	handleFormClick(formChar: string, formId: string) {
		switch (formChar) {
			case "i":
				this.openFormsService.openExistingForm(
					"i",
					formId,
					"organization",
					this.currentRecordId,
				);
				break;
			case "o":
				this.openFormsService.openExistingForm(
					"o",
					formId,
					"organization",
					this.currentRecordId,
				);
				break;
		}
	}

	openEditRecord(mode: string) {
		return this.dialog.open(OrganizationContentDialog, {
			width: "fit-content",
			height: "fit-content",
			maxWidth: "90vw",
			maxHeight: "90vh",
			panelClass: "custom-dialog",
			data: {
				mode,
				orgRecord: this.orgRecord,
			},
		});
	}

  onTabChange(event: MatTabChangeEvent) {
    this.tab = event.tab.ariaLabelledby;
  }

	openAddForm(message?: string) {
		let url = this.router.serializeUrl(
			this.router.createUrlTree(["/error", "not-found"]),
		);

		const queryParams = { recordType: "organization", recordId: this.currentRecordId }

		switch (this.tab) {
			case "information-and-referral":
				url = this.router.serializeUrl(
					this.router.createUrlTree(["/information-and-referral"], {
						queryParams,
					}),
				);
				break;
			case "ceo":
				url = this.router.serializeUrl(
					this.router.createUrlTree(["/community-education-outreach"], { queryParams }),
				);
				break;
			default:
				break;
		}

		try {
			this.router.navigateByUrl(url);
		} catch (error) {
			console.error("Navigation error:", error);
		}
	}


	openAddAttachment() {
		return this.dialog.open(AddAttachmentContentDialog, {
			width: "fit-content",
			height: "fit-content",
			maxWidth: "90vw",
			maxHeight: "90vh",
			panelClass: "custom-dialog",
			data: {},
		});
	}

	/*
   Form get functions  (forms retrieved by personId)
  */
	getInformationAndReferralForms(orgId: string) {
		orgId != "" ? "" : console.log("No Forms Found.");
    const storedForms = localStorage.getItem("iAndR-forms");
    const forms = storedForms ? JSON.parse(storedForms) : [];
    return forms.filter((r: any) => r.organizationId === orgId);
	}

	getCommunityEducationAndutreachForms(orgId: string) {
		orgId != "" ? "" : console.log("No Forms Found.");
    const storedForms = localStorage.getItem("ceo-forms");
    const forms = storedForms ? JSON.parse(storedForms) : [];
    return forms.filter((r: any) => r.organization === orgId);
	}

	saveNotes() {
		// TODO: Implement PUT request on Person
		try {
			this.snackBar.open("Placeholder", "", { duration: 2000 });
		} catch (error) {
			console.error("Notes not saved: ", error);
		}
	}
}
