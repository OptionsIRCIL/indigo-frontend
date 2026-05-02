import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenState {

  private _token = new BehaviorSubject<boolean>(false);

  constructor() { }
	public get token() {
		return this._token;
	}
}
