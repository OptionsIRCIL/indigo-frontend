import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../../model/person";
import { ConfigService } from "../../config/config.service";

@Injectable({
	providedIn: "root",
})
export class PersonClientService {
	private apiUrl = "";
	public constructor(
		private http: HttpClient,
		private configService: ConfigService,
	) {
		this.apiUrl = this.configService.getAppConfig("apiUrl");
	}

	public getAll() {
		return this.http.get<Person>(`${this.apiUrl}person`, {
			withCredentials: true,
		});
	}

	public getPerson(id: string) {
		return this.http.get<Person>(`${this.apiUrl}person/${id}`, {
			withCredentials: true,
		});
	}

  public putPerson(id: string, data: Person) {
		return this.http.put<Person>(`${this.apiUrl}person/${id}`, data, {
			withCredentials: true,
		});
	}

	public postPerson(data: Person) {
		return this.http.post<Person>(`${this.apiUrl}person`, data, {
			observe: "response",
			withCredentials: true,
		});
	}

	public getPersonNotes(id: string) {
    return this.http.get<string>(`${this.apiUrl}person/${id}/notes`, {
      withCredentials: true,
    });
  }

  public putPersonNotes(id: string, data: string) {
    return this.http.put<string>(`${this.apiUrl}person/${id}/notes`, data, {
      withCredentials: true,
    });
  }

}
