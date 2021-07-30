import { Guid } from 'guid-typescript';
import { ISchedulerFilter } from '../service.model';

export interface IIntakeSchedulerFilter extends ISchedulerFilter {
	patientIds: Guid[];
}
