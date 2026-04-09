import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InformationAndReferral } from "../../model/information-and-referral";
import { ConfigService } from "../../config/config.service";

@Injectable({
	providedIn: "root",
})
export class InformationAndReferralClientService {
	private apiUrl: string = "";

	public constructor(
		private http: HttpClient,
		private configService: ConfigService,
	) {
		this.apiUrl = this.configService.getAppConfig("apiUrl");
	}

	public getInformationAndReferral(id: string) {
		return this.http.get<InformationAndReferral>(
			`${this.apiUrl}information-and-referral/${id}`,
			{ withCredentials: true },
		);
	}

	public getInformationAndReferralCollection() {
		return this.http.get<InformationAndReferral[]>(
			`${this.apiUrl}information-and-referral/`,
			{ withCredentials: true },
		);
	}

	public postInformationAndReferral(data: InformationAndReferral) {
		return this.http.post<unknown>(
			`${this.apiUrl}information-and-referral`,
			data,
			{ withCredentials: true },
		);
	}
}
