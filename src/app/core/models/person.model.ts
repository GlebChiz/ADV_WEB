import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { IAddress } from './address.model';
import { ICheckList } from './checklist.model';
import { IInsurance } from './insurance.model';

export interface IPerson {
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
	address: IAddress;
	guardianCheckList: ICheckList;

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

	primaryInsurance: IInsurance | null;
	secondaryInsurance: IInsurance | null;
	wardPatientIds: Guid[];
}

export interface IGeneralPersonData {
	id: string;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date | null;
	address: IAddress;
}

export interface IPersonDemographicData {
	id: Guid | null;
	sexId: string | null;
	raceIds: string[];
	languageIds: string[];
	maritalStatusId: string | null;
	genderId: string | null;
	employementId: string | null;
}

export interface IPersonContactsData {
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

export interface IPersonInsuranceData {
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

export interface ICaller {
	id: Guid | null;
	lastname: string;
	firstname: string;
	middlename: string;
	dob: Date | null;
}

export interface IRelationship {
	id: string;
	type: number;
	definitionId: string;
	title: string;
}

export interface IPrivatePersonLink {
	personId: string;
	relationships: IRelationship[];
	title: string;
}

export interface IPersonShortModel {
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
