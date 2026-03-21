export class InformationAndReferral {

	public constructor(
		public callerType: string,
		public date: string,
		public department: string,
		public disability: string | null,
		// is this set by the backend?
		public employeeId: string,
		public formDate: string,
		public grant: string,
		public hours: number,
		public organizationId: string,
		public outcome: string,
		public personId: string,
		public referrer: string,
		public serviceRequest: string,
		public serviceType: string,
		public travelHours: number,
		public units: string,
	){}

	// TODO - make fromFormData() method

}
