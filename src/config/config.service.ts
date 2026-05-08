import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";
import { TokenState } from "../service/state/token-state.service";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configData: any;

	constructor(private http: HttpClient,
							private tokenState: TokenState,) {}

	loadAppConfig() {
		return firstValueFrom(this.http.get('./config/config.json')
			.pipe(
				tap(data => this.configData = data),
			));
	}

	getAppConfig(key: keyof typeof this.configData) {
		return this.configData[key];
	}

	public async setToken() {
		const cookie = await window.cookieStore.get("IndigoAuth");
		if (!cookie) {
			this.tokenState.token.next(false);
		} else {
			this.tokenState.token.next(true);
		}
	}

	get demoMode(): boolean {
		return this.configData?.demo ?? false;
	}
}
