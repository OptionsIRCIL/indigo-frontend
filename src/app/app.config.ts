import {
	ApplicationConfig,
	inject,
	provideEnvironmentInitializer,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { AccessClientService } from "../service/client/access-client.service";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideEnvironmentInitializer(() => {
			return inject(AccessClientService).get().subscribe();
		}
		),
	],
};
