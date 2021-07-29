import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { Address } from './address.model';
import { CheckList } from './checklist.model';
import { Insurance } from './insurance.model';

export interface Person {
	id: Guid;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date | null;
	notes: string;
	mobilephone: string;
	workphone: string;
	otherphone: string;
	homephone: string;
	email: string;
	address: Address;
	guardianCheckList: CheckList;

	sexId: string | null;
	raceIds: string[];
	languageIds: string[];
	maritalStatusId: string | null;
	genderId: string | null;
	employementId: string | null;

	mobilePhone: string;
	mobilePhonePolicyId: string | null;
	homePhone: string;
	homePhonePolicyId: string | null;
	workPhone: string;
	workPhonePolicyId: string | null;
	otherPhone: string;
	otherPhonePolicyId: string | null;
	primaryPhoneType: string | null;

	primaryInsurance: Insurance | null;
	secondaryInsurance: Insurance | null;
	wardPatientIds: Guid[];
}

export interface GeneralPersonData {
	id: string;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date | null;
	address: Address;
}

export interface PersonDemographicData {
	id: Guid | null;
	sexId: string | null;
	raceIds: string[];
	languageIds: string[];
	maritalStatusId: string | null;
	genderId: string | null;
	employementId: string | null;
}

export interface PersonContactsData {
	id: Guid | null;
	email: string;
	mobilePhone: string;
	mobilePhonePolicyId: string | null;
	homePhone: string;
	homePhonePolicyId: string | null;
	workPhone: string;
	workPhonePolicyId: string | null;
	otherPhone: string;
	otherPhonePolicyId: string | null;
	primaryPhoneType: string | null;
}

export interface PersonInsuranceData {
	id: Guid | null;
	email: string;
	mobilePhone: string;
	mobilePhonePolicyId: string | null;
	homePhone: string;
	homePhonePolicyId: string | null;
	workPhone: string;
	workPhonePolicyId: string | null;
	otherPhone: string;
	otherPhonePolicyId: string | null;
	primaryPhoneType: string | null;
}

export interface Caller {
	id: Guid | null;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date | null;
}

export interface Relationship {
	id: string;
	type: number;
	definitionId: string;
	title: string;
}

export interface PrivatePersonLink {
	personId: string;
	relationships: Relationship[];
	title: string;
}

export interface PersonShortModel {
	id: Guid;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date;
}

export const MetaData = {
	lastname: 'Last name',
	firstname: 'First name',
	middlename: 'Middle name',
	dob: 'DOB',
	mobilephone: 'Mobile',
	workphone: 'Work',
	otherphone: 'Other',
	homephone: 'Home',
	email: 'Email',
	address: 'Address',

	statusId: 'Status',
	raceIds: 'Race',
	languageIds: 'Language',
	maritalStatusId: 'Marital status',
	sexId: 'Administrative sex',
	genderId: 'Gender',
	employementId: 'Employement',

	mobilePhone: 'Mobile Phone',
	mobilePhonePolicyId: '',
	homePhone: 'Home Phone',
	homePhonePolicyId: '',
	workPhone: 'Work Phone',
	workPhonePolicyId: '',
	otherPhone: 'Other Phone',
	otherPhonePolicyId: '',
	primaryPhoneType: 'Primary Phone',
	areaIds: 'Area Codes',
	serviceTypeIds: 'Service Types',
};

export function personTitle(person: any): string {
	return `${person.lastname}, ${person.firstname} ${person.middlename || ''} ${formatDate(
		person.dob,
		'MM/dd/yyyy',
		'en-US',
	)}`;
}
