/*
This will be updated once backend finalizes token stuff
*/

export interface Token {
	givenName: string;
  familyName: string;
  groups: string[];
  iss: string;
  aud: string[];
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
}
