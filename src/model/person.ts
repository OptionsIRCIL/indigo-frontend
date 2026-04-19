import { PersonType } from "./types/person-type";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

export class Person {

	public constructor(
    public id: string | null,
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

	public static fromObject(data: unknown): Person | null  {
		const result = PersonType.decode(data);
		if (!isRight(result)){
			console.error(PathReporter.report(result));
			return null;
		}
		else {
			return new Person(
        result.right.id,
				result.right.active,
				result.right.addressLine1,
				result.right.addressLine2,
				result.right.birthday,
				result.right.city,
				result.right.county,
				result.right.deceased,
				result.right.email,
				result.right.ethnicity,
				result.right.firstName,
				result.right.gender,
				result.right.lastName,
				result.right.membership,
				result.right.optNewsletter,
				result.right.phone,
				result.right.salutation,
				result.right.state,
			)
		}

	}
}
