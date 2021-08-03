import { Guid } from 'guid-typescript';
import { CheckListItemStatus, CheckListItemType } from '../enums/checklist.types';
import { ICheckList } from './checklist.model';
import { IPatient } from './patient.model';
import { IPerson } from './person.model';

export interface ICall {
	id: Guid;
	userId: number;
	callerId: string | null;
	areaId: string | null;
	advertisementSourceId: string | null;
	callerType: CallerType;
	fromPhone: string;
	toPhone: string | null;
	callTime: Date;
	endTime: Date | null;
	person: IPerson;
	notes: string | null;
	patients: ICallPatientIndex[];
	requestedPatients: number | null;
	duration: string;
	confirmationCode: string | null;
}

export interface ICallPatientIndex {
	id: Guid;
	callId: Guid;
	patient: IPatient;
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

export interface ICallManagerStep {
	id: string;
	parentStepId: string;
	person: IPerson;
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
	back: ICallManagerStep;
	next: ICallManagerStep;
	left: number;
	test: boolean;
	items: ICallManagerStep[];
	checkList: ICheckList;
}
