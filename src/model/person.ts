export class Person {

	public constructor(
		public active: boolean,
		public addressLine1: string | null,
		public addressLine2: string | null,
		public birthday: string,
		public city: string,
		public county: string,
		public deceased: boolean,
		public email: string,
		public ethnicity: string,
		public firstName: string,
		public gender: string,
		public lastName: string,
		public membership: string,
		public optNewsletter: boolean,
		public phone: string,
		public salutation: string | null,
		public state: string,
	){}
}
