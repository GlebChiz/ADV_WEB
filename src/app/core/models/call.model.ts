import { Guid } from 'guid-typescript';
import { CheckListItemStatus, CheckListItemType } from '../enums/checklist.types';
import { CheckList } from './checklist.model';
import { Patient } from './patient.model';
import { Person } from './person.model';

export interface Call {
	id: Guid;
	userId: number;
	callerId: string | null;
	areaId: string | null;
	advertisementSourceId: string | null;
	callerType: CallerType;
	fromPhone: string | null;
	toPhone: string | null;
	callTime: Date;
	endTime: Date | null;
	person: Person;
	notes: string | null;
	patients: CallPatientIndex[];
	requestedPatients: number | null;
	duration: string;
	confirmationCode: string | null;
}

export interface CallPatientIndex {
	id: Guid;
	callId: Guid;
	patient: Patient;
}

export const MetaData = {
	callerId: 'Caller ID',
	toPhone: 'Call to',
	fromPhone: 'Call from',
	callTime: 'Call Time',
	endTime: 'End Time',
	areaId: 'Location',
	advertisementSourceId: 'Advertisement Source',
	callType: 'Call Type',
	person: 'Caller',
	notes: 'Notes',
	confirmationCode: 'Confirmation Code',
};

export enum CallerType {
	Unknown = 0,
	Patient = 1,
	Parent = 2,
}

export interface CallManagerStep {
	id: string;
	parentStepId: string;
	person: Person;
	personId: Guid | null;
	patientId: Guid | null;
	patientStatusId: Guid | null;
	patientAreaId: Guid | string | null;
	showPatientStatus: boolean;
	title: string;
	gotoNext: boolean;
	controlType: string;
	status: CheckListItemStatus;
	type: CheckListItemType | null;
	back: CallManagerStep;
	next: CallManagerStep;
	left: number;
	test: boolean;
	items: CallManagerStep[];
	checkList: CheckList;
}
