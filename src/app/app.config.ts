import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideEnvironmentInitializer,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { AccessClientService } from "../service/client/access-client.service";
import { ConfigService } from '../config/config.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
    provideAppInitializer(() => {
      return inject(ConfigService).loadAppConfig();
    }),
		provideEnvironmentInitializer(() => {
			//return inject(AccessClientService).get().subscribe();
		}
		),
	],
};
