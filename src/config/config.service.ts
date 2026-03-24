import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configData: any;

	constructor(private http: HttpClient) {}

	loadAppConfig() {
		return firstValueFrom(this.http.get('./config/config.json')
			.pipe(
				tap(data => this.configData = data),
			));
	}

	getAppConfig(key: keyof typeof this.configData) {
		return this.configData[key];
	}
}
