import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { authGuard } from "../guards/guards.guard";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { NotFoundComponent } from "./error-components/not-found/not-found.component";
import { ForbiddenComponent } from "./error-components/forbidden/forbidden.component";
import { AppComponent } from "./app.component";
import { IandrComponent } from "./iandr/iandr.component";

export const routes: Routes = [
	{
		path: "",
		component: AppComponent,
		children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "main-dashboard",
      },
      {
				path: "main-dashboard",
				component: MainDashboardComponent,
			},
			{
				path: "login",
				component: LoginComponent,
			},
			{
				path: "iandr",
				component: IandrComponent,
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
