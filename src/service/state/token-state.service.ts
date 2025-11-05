import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { Token } from '../../interface/token';

@Injectable({
  providedIn: 'root'
})
export class TokenState {

  private _token = new ReplaySubject<Token | null>(1);

  constructor() { }
	public get token() {
		return this._token;
	}
}
