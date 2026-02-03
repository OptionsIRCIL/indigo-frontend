import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Token } from "../../interface/token";
import { Router } from "@angular/router";
import {environment} from '../../environments/envrionment';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessClientService {
  constructor(private http: HttpClient,
							private router: Router,) { }

	public login(email: string, password: string) {
		return this.http.post<Token>(`${environment.apiUrl}auth`,
      {username: email, password: password},
      {withCredentials: true});
	}

	public logout() {
		return this.http.delete(`${environment.apiUrl}auth`, { withCredentials: true,});
	}

  public get() {
    return this.http.get<unknown>(`${environment.apiUrl}`, {withCredentials: true}).pipe(tap(
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
