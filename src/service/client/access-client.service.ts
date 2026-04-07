import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Token } from "../../interface/token";
import { ConfigService } from "../../config/config.service";

@Injectable({
	providedIn: "root",
})
export class AccessClientService {
	private apiUrl = "";

	constructor(
		private http: HttpClient,
		private configService: ConfigService,
	) {
		this.apiUrl = this.configService.getAppConfig("apiUrl");
	}

	public login(email: string, password: string) {
		return this.http.post<Token>(
			`${this.apiUrl}auth`,
			{ username: email, password: password },
			{ withCredentials: true },
		);
	}

	public logout() {
		return this.http.delete(`${this.apiUrl}auth`, { withCredentials: true });
	}

}
