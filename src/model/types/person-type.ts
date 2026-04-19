import * as t from "io-ts";

export const PersonType = t.type({
	id: t.string,
  active: t.boolean,
	addressLine1: t.union([t.string, t.null]),
	addressLine2: t.union([t.string, t.null]),
	birthday: t.string,
	city: t.string,
	county: t.string,
	deceased: t.boolean,
	email: t.string,
	ethnicity: t.string,
	firstName: t.string,
	gender: t.string,
	lastName: t.string,
	membership: t.string,
	optNewsletter: t.boolean,
	phone: t.string,
	salutation: t.union([t.string, t.null]),
	state: t.string,
});
