import * as t from 'io-ts';

export const InformationAndReferralType = t.type({
	createdAt: t.union([t.string, t.null]),
	date: t.string,
	department: t.string,
	employeeId: t.union([t.string, t.null]),
	formDate: t.string,
	grant: t.string,
	id: t.union([t.string, t.null]),
	organizationId: t.union([t.string, t.null]),
	outcome: t.string,
	personId: t.union([t.string, t.null]),
	referrer: t.string,
	serviceRequest: t.string,
	serviceType: t.string,
	updatedAt: t.union([t.string, t.null]),
});
