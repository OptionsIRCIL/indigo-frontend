export class InformationAndReferral {

	public constructor(
		public createdAt: string | null,
		public date: string,
		public department: string,
		public employeeId: string | null,
		public formDate: string,
		public grant: string,
		public id: string | null,
		public organizationId: string | null,
		public outcome: string,
		public personId: string | null,
		public referrer: string,
		public serviceRequest: string,
		public serviceType: string,
		public updatedAt: string | null,
	){}

}
