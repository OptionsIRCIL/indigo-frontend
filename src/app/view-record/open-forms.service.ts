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
  openExistingForm(formChar: string, formId: string, recordType?: string, recordId?: string){
    // route to the form depending on type
    try {
      const queryParams = (recordType && recordId) ? { recordType, recordId } : undefined;
      switch (formChar){
        case "i":
          this.router.navigate(['/information-and-referral', formId], { queryParams })
          break;
        case "g":
          this.router.navigate(['/goals', formId], { queryParams })
          break;
        case "c":
          this.router.navigate(['/consumer-information-file', formId], { queryParams })
          break;
        case "o":
          this.router.navigate(['/community-education-outreach', formId], { queryParams })
          break;
      }

    } catch (error) {
      console.error('Navigation error:', error);
    }
 }
}