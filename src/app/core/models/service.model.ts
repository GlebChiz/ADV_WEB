import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Guid } from 'guid-typescript';
import { DropDownData } from './kendo/dropdown-data.model';
import { Patient } from './patient.model';

export interface Service {
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

export interface EditingService extends Service {
	patientLookup: DropDownData[];
	clinicianLookup: DropDownData[];
	serviceTypeLookup: DropDownData[];
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

export interface IntakeSchedulerPatientModel {
	patientId: Guid;
	patientName: string;
	patient: Patient;
	scheduledService: Service;
	deliveredService: Service;
	cancelledServices: string;
}

export interface IntakeSchedulerModel {
	patientLookup: DropDownData[];
	filter: any;
	clinicianLookup: DropDownData[];
	start: Date | null;
	end: Date | null;
}

export enum AvailabilityType {
	None = 0,
	Available = 1,
	Possible = 2,
}

export interface SlotDecorationModel {
	start: Date;
	end: Date;
	type: AvailabilityType;
}

export interface SchedulerViewModel {
	events: SchedulerEvent[];
	slotDecoration: SlotDecorationModel[];
	services: Service[];
	canCreate: boolean;
	ignoreAvailability: boolean;
	createDenyMessage: string;
	canEdit: boolean;
}

export interface SchedulerSettings {
	min: Date | null;
	max: Date | null;
	slotDuration: number;
	canChangeDelivered: boolean;
	canChangeCancelled: boolean;
	fields: ServiceFieldsSettings;
}

export interface SchedulerFilter {
	start: Date;
	end: Date;
}

export enum ServiceFieldEditRule {
	Hide = 0,
	Display = 1,
	Edit = 2,
}

export interface ServiceFieldsSettings {
	patient: ServiceFieldEditRule;
	clinician: ServiceFieldEditRule;
	serviceType: ServiceFieldEditRule;
	status: ServiceFieldEditRule;
	deliveryType: ServiceFieldEditRule;
	time: ServiceFieldEditRule;
}
