import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/envrionment";
import { Person } from "../../model/person";

@Injectable({
  providedIn: 'root',
})
export class PersonClientService {

	public constructor(private http: HttpClient) { }

	public getPerson(id: string) {
		return this.http.get<unknown>(`${environment.apiUrl}person/${id}`, {withCredentials: true});
	}

	public postPerson(data: Person) {
		return this.http.post<unknown>(`${environment.apiUrl}person`, data, {withCredentials: true});
	}

}
