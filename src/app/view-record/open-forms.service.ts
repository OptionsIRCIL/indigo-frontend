import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OpenFormsService {
  constructor(private router: Router) {}

  /* 
  openExistingForm
  opens any form in view-record that is listed under the form tabs
      formChar - specifies the form type that will be opened
  */
  openExistingForm(formChar: string){
    let url;
    //get id for selected form
    const formId = "";
    // route to the form depending on type
    try {
      switch (formChar){
        case "i":
          url = this.router.serializeUrl(
            this.router.createUrlTree(['/information-and-referral', formId])
          );
          break;
        case "g":
          url = this.router.serializeUrl(
            this.router.createUrlTree(['/goals', formId])
          );
          break;
        case "c":
          url = this.router.serializeUrl(
            this.router.createUrlTree(['/consumer-information-file', formId])
          );
          break;
        case "o":
          url = this.router.serializeUrl(
            this.router.createUrlTree(['/community-education-outreach', formId])
          );
          break;
      }
      window.open(url, '_blank'); // opens in a new tab

    } catch (error) {
      console.error('Navigation error:', error);
    }
 }
}