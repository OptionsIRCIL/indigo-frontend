export class Organization {
	public constructor(
		public active: boolean,
		public birthday: string,
		public deceased: boolean,
		public email: string,
		public name: string,
		public gender: string,
		public phone: string,
		public id?: string,
		public notes?: string,
		public repFirstName?: string;
		public repLastName?: string;
		public repPosition?: string;
  ) {}
}
