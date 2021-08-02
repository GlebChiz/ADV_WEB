import { Guid } from 'guid-typescript';
import { PatientModalityStatus } from '../enums/patient.modality.status';
import { ICheckList } from './checklist.model';
import { IEditingForm, IFormGroup } from './form.model';
import { IPerson } from './person.model';

export interface IPatient {
	id: Guid;
	person: IPerson | null;

	statusId: Guid | null;
	areaId: string | null;

	icCheckList: ICheckList | null;

	modalities: IPatientModality[];
	forms: IEditingForm[];
	groups: IFormGroup[];
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
};

export interface IPatientModality {
	modalityId: Guid;
	checked: boolean;
	name: string;
	status: PatientModalityStatus;
}
