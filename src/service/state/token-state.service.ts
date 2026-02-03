import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenState {

  private _token = new BehaviorSubject<string | null>(null);

  constructor() { }
	public get token() {
		return this._token;
	}
}
