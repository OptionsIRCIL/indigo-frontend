import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RecordIdState {
	constructor() {}

	public get recordId(): string {
		return localStorage.getItem("recordId") ?? "";
	}
	public set recordId(id: string) {
    console.log("recordId set to " + id);
    localStorage.setItem("recordId", id);
  }
}
