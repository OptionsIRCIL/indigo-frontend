import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { authGuard } from "../guards/guards.guard";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { NotFoundComponent } from "./error-components/not-found/not-found.component";
import { ForbiddenComponent } from "./error-components/forbidden/forbidden.component";
import { IandrComponent } from "./iandr/iandr.component";
import { IndividualViewRecordComponent, OrganizationViewRecordComponent } from "./view-record/view-record.component";
import { CEOComponent } from "./ceo/ceo.component";
import { ConsumerServiceRecordComponent } from './consumer/consumer.component';
import { GoalsComponent } from "./goals/goals.component";

export const routes: Routes = [
	{
		path: "",
		children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "main-dashboard",
      },
      {
				path: "main-dashboard",
				//canActivate: [authGuard],
				component: MainDashboardComponent,
			},
			{
				path: "view-record",
				children: [
					{
						path: "individual/:id",
						component: IndividualViewRecordComponent,
					},
					{
						path: "organization/:id",
						component: OrganizationViewRecordComponent,
					}
				],
			},
			{
				path: "login",
				component: LoginComponent,
			},
			{
				path: "information-and-referral",
				component: IandrComponent,
			},
			{
				path: "community-education-outreach",
				component: CEOComponent,
			},
			{
				path: "consumer-service-record",
				component: ConsumerServiceRecordComponent,
			},
			{
				path: "goals",
				component: GoalsComponent,
			},
			{
				path: "error",
				children: [
					{
						path: "not-found",
						component: NotFoundComponent
					},
					{
						path: "forbidden",
						component: ForbiddenComponent
					}
				],
			},
			{
				path: "**",
				component: NotFoundComponent,
			},
		],
	},
];
