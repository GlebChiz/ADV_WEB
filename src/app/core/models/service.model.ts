import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Guid } from 'guid-typescript';
import { IDropDownData } from './kendo/dropdown-data.model';
import { IPatient } from './patient.model';

export interface IService {
	id: Guid;
	patientId: Guid;
	clinicianId: Guid;
	date: Date;
	type: ServiceType;
	status: ServiceStatus;
	deliveryType: ServiceDeliveryType;
	serviceTypeId: Guid;
	units: number;
	unitType: ServiceUnitType;
	start: Date;
	end: Date;
	title: string;
	description: string;
	timezone: number;
}

export interface IEditingService extends IService {
	patientLookup: IDropDownData[];
	clinicianLookup: IDropDownData[];
	serviceTypeLookup: IDropDownData[];
}

export enum ServiceType {
	IntakeAppointment = 1,
}

export enum ServiceStatus {
	Scheduled = 0,
	Delivered = 1,
	Cancelled = 2,
}

export enum ServiceDeliveryType {
	InPerson = 1,
	Zoom = 2,
	Phone = 3,
}

export enum ServiceUnitType {
	Visit = 0,
	Hour = 60,
	Min45 = 45,
	Min30 = 30,
	Min15 = 15,
	Min1 = 1,
}

export interface IIntakeSchedulerPatientModel {
	patientId: Guid;
	patientName: string;
	patient: IPatient;
	scheduledService: IService;
	deliveredService: IService;
	cancelledServices: string;
}

export interface IIntakeSchedulerModel {
	patientLookup: IDropDownData[];
	filter: any;
	clinicianLookup: IDropDownData[];
	start: Date | null;
	end: Date | null;
}

export enum AvailabilityType {
	None = 0,
	Available = 1,
	Possible = 2,
}

export interface ISlotDecorationModel {
	start: Date;
	end: Date;
	type: AvailabilityType;
}

export interface ISchedulerViewModel {
	events: SchedulerEvent[];
	slotDecoration: ISlotDecorationModel[];
	services: IService[];
	canCreate: boolean;
	ignoreAvailability: boolean;
	createDenyMessage: string;
	canEdit: boolean;
}

export interface ISchedulerSettings {
	min: Date | null;
	max: Date | null;
	slotDuration: number;
	canChangeDelivered: boolean;
	canChangeCancelled: boolean;
	fields: IServiceFieldsSettings;
}

export interface ISchedulerFilter {
	start: Date;
	end: Date;
}

export enum ServiceFieldEditRule {
	Hide = 0,
	Display = 1,
	Edit = 2,
}

export interface IServiceFieldsSettings {
	patient: ServiceFieldEditRule;
	clinician: ServiceFieldEditRule;
	serviceType: ServiceFieldEditRule;
	status: ServiceFieldEditRule;
	deliveryType: ServiceFieldEditRule;
	time: ServiceFieldEditRule;
}
