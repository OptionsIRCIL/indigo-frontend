import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Token } from "../../interface/token";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { ConfigService } from "../../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class AccessClientService {

	private apiUrl = '';

  constructor(private http: HttpClient,
							private router: Router,
							private configService: ConfigService,
							)
	{
		this.apiUrl = this.configService.getAppConfig("apiUrl");
	}


	public login(email: string, password: string) {
		return this.http.post<Token>(`${this.apiUrl}auth`,
      {username: email, password: password},
      {withCredentials: true});
	}

	public logout() {
		return this.http.delete(`${this.apiUrl}auth`, { withCredentials: true,});
	}

  public get() {
    return this.http.get<unknown>(`${this.apiUrl}`, {withCredentials: true}).pipe(tap(
      {
        next: () => {
          //ADD EMPLOYEE OBJECT RETURNED BY REQUEST
        },
        error: err => {
          this.router.navigate(['/login']);
        }
      }
    ));
  }
}
