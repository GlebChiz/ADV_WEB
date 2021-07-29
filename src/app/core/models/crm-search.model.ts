import { Guid } from 'guid-typescript';
import { Call } from './call.model';
import { Person } from './person.model';

export interface CRMSearch {
	call: Call;
	phones: any;
	lastnames: any;
	emails: any;
	callerId: string;
	addresses: any;
	persons: any;
}

export interface CRMResult {
	byPhone: any;
	byLastname: any;
	byEmail: any;
	byCallerId: any;
	byAddress: any;
	byPerson: any;
}

export interface CRMPersonFound {
	person: Person;
	call: Call;
	calls: Call[];
	roles: CRMPersonMatchRole[];
	matches: CRMMatch[];
}

export enum CRMPersonMatchRole {
	Caller = 1,
	Patient = 2,
	Parent = 3,
}

export interface CRMMatch {
	type: CRMSearchType;
	matchValue: string;
	matchMessage: string;
}

export enum CRMSearchType {
	Phone = 1,
	CallerId = 2,
	Lastname = 3,
}

export interface CRMSearchFilter {
	phones: string[];
	lastnames: string[];
	callerId: string;
	skipCallId: Guid | null;
	skipPersonIds: Guid[];
}

/*
export interface CRMSearchPerson {
    id: Guid | string | null;
    lastname: string;
    firstname: string;
    email: string;
    dob: Date;
    address: string;
    city: string;
    state: string;
    zip: string;
}
*/
