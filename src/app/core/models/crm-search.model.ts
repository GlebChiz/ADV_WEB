import { Guid } from 'guid-typescript';
import { ICall } from './call.model';
import { IPerson } from './person.model';

export interface ICRMSearch {
	call: ICall;
	phones: any;
	lastnames: any;
	emails: any;
	callerId: string;
	addresses: any;
	persons: any;
}

export interface ICRMResult {
	byPhone: any;
	byLastname: any;
	byEmail: any;
	byCallerId: any;
	byAddress: any;
	byPerson: any;
}

export interface ICRMPersonFound {
	person: IPerson;
	call: ICall;
	calls: ICall[];
	roles: CRMPersonMatchRole[];
	matches: ICRMMatch[];
}

export enum CRMPersonMatchRole {
	Caller = 1,
	Patient = 2,
	Parent = 3,
}

export interface ICRMMatch {
	type: CRMSearchType;
	matchValue: string;
	matchMessage: string;
}

export enum CRMSearchType {
	Phone = 1,
	CallerId = 2,
	Lastname = 3,
}

export interface ICRMSearchFilter {
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
