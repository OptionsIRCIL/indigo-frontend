import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { authGuard } from "../guards/guards.guard";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";

export const routes: Routes = [
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "",
		canActivate: [authGuard],
		children: [
			{
				path: "main-dashboard",
				component: MainDashboardComponent,
			}
		]
	}
];
