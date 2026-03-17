import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InformationAndReferral } from "../../model/information-and-referral";
import { environment } from "../../environments/envrionment";

@Injectable({
  providedIn: 'root',
})
export class InformationAndReferralClientService {

	public constructor(private http: HttpClient) { }

	public getInformationAndReferral(id: string) {
		return this.http.get<unknown>(`${environment.apiUrl}information-and-referral/${id}`, {withCredentials: true});
	}

	public postInformationAndReferral(data: InformationAndReferral) {
		return this.http.post<unknown>(
			`${environment.apiUrl}information-and-referral`, data, {withCredentials: true}
		);
	}


}
