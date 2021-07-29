import { Guid } from 'guid-typescript';
import { PatientModalityStatus } from '../enums/patient.modality.status';
import { CheckList } from './checklist.model';
import { EditingForm, FormGroup } from './form.model';
import { Person } from './person.model';

export interface Patient {
	id: Guid;
	person: Person | null;

	statusId: Guid | null;
	areaId: string | null;

	icCheckList: CheckList | null;

	modalities: PatientModality[];
	forms: EditingForm[];
	groups: FormGroup[];
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

export interface PatientModality {
	modalityId: Guid;
	checked: boolean;
	name: string;
	status: PatientModalityStatus;
}
