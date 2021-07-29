import { Guid } from 'guid-typescript';
import { SchedulerFilter } from '../service.model';

export interface IntakeSchedulerFilter extends SchedulerFilter {
	patientIds: Guid[];
}
