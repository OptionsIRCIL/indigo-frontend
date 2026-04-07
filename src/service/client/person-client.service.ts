import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Person } from "../../model/person";
import { ConfigService } from "../../config/config.service";

@Injectable({
  providedIn: 'root',
})
export class PersonClientService {
	private apiUrl = '';
	public constructor(private http: HttpClient,
										 private configService: ConfigService,) {
		this.apiUrl = this.configService.getAppConfig('apiUrl');
	}

	public getPerson(id: string) {
		return this.http.get<unknown>(`${this.apiUrl}person/${id}`, {withCredentials: true});
	}

	public postPerson(data: Person) {
		return this.http.post<unknown>(`${this.apiUrl}person`, data, {withCredentials: true});
	}

}
