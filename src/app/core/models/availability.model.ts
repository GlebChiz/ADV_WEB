import { Guid } from 'guid-typescript';
import { IPerson } from './person.model';

export enum PersonAvailabilityType {
	ClinicianIntake = 1,
	PatientService = 2,
	ClinicianService = 3,
}

export enum AvailabilityStatus {
	Available = 1,
	Possible = 2,
}

export interface IPersonAvailabilityFilter {
	personId: Guid | string | null;
	type: PersonAvailabilityType | null;
	start: Date;
	end: Date;
}

export interface IPersonAvailability {
	id: Guid | string;
	personId: Guid | string;
	type: PersonAvailabilityType;
	startDate: Date;
	endDate: Date | null;
	person: IPerson;
	day: number;
	startTime: Date;
	endTime: Date;
	status: AvailabilityStatus;
}

export interface IAvailabilitySchedulerFilter {
	start: Date;
	end: Date;
	serviceStart: Date | null;
	serviceEnd: Date | null;
}
