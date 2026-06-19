import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RecordIdState {
	private _recordId: string = "";

  // TODO: Retain state on refresh. Cookies?

	constructor() {}
	public get recordId(): string {
		return this._recordId;
	}
	public set recordId(id: string) {
    console.log("recordId set to " + id);
    this._recordId = id;
  }
}
