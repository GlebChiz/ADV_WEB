import { Guid } from 'guid-typescript';
import { SchedulerFilter } from '../service.model';

export interface ClinicianFilterModel {
	search: string;
}

export interface ClinicianSchedulerFilter extends SchedulerFilter {
	clinicianId: Guid | null;
}
