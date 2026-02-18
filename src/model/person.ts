export class Person {

	public constructor(
		public active: boolean,
		public birthday: string,
		public deceased: boolean,
		public email: string,
		public firstName: string,
		public lastName: string,
		public gender: string,
		public phone: string,
		public salutation: string | null
	){}

	// TODO - add fromFormData() method

}
