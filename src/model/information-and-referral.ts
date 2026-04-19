import { InformationAndReferralType } from './types/information-and-referral-type';
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

export class InformationAndReferral {
	public constructor(
		public id: string | null,
    public date: string,
		public department: string,
		public employeeId: string | null,
		public formDate: string,
		public grant: string,
		public organizationId: string | null,
		public outcome: string,
		public personId: string | null,
		public referrer: string,
		public serviceRequest: string,
		public serviceType: string,
	) {}

  public static fromObject(data: unknown) {
    const result = InformationAndReferralType.decode(data);
    if (!isRight(result)) {
      console.error(PathReporter.report(result));
      return null;
    } else {
      return new InformationAndReferral(
        result.right.id,
        result.right.date,
        result.right.department,
        result.right.employeeId,
        result.right.formDate,
        result.right.grant,
        result.right.organizationId,
        result.right.outcome,
        result.right.personId,
        result.right.referrer,
        result.right.serviceRequest,
        result.right.serviceType,
      )
    }
  }
}
