import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organization } from "../../model/organization";
import { ConfigService } from "../../config/config.service";

@Injectable({
	providedIn: "root",
})
export class OrganizationClientService {
	private apiUrl = "";
	public constructor(
		private http: HttpClient,
		private configService: ConfigService,
	) {
		this.apiUrl = this.configService.getAppConfig("apiUrl");
	}

	public getAll() {
		return this.http.get<Organization>(`${this.apiUrl}organization`, {
			withCredentials: true,
		});
	}

	public getOrganization(id: string) {
		return this.http.get<Organization>(`${this.apiUrl}organization/${id}`, {
			withCredentials: true,
		});
	}

  public putOrganization(id: string, data: Organization) {
		return this.http.put<Organization>(`${this.apiUrl}organization/${id}`, data, {
			withCredentials: true,
		});
	}

	public postOrganization(data: Organization) {
		return this.http.post<Organization>(`${this.apiUrl}organization`, data, {
			observe: "response",
			withCredentials: true,
		});
	}
}
