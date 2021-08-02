import { Guid } from 'guid-typescript';
import { ISchedulerFilter } from '../service.model';

export interface IClinicianFilterModel {
	search: string;
}

export interface IClinicianSchedulerFilter extends ISchedulerFilter {
	clinicianId: Guid | null;
}
