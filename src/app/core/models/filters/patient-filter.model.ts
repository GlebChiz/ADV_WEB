import { Guid } from 'guid-typescript';

export interface IPatientFilterModel {
	statusId: Guid | null;
	search: string;
	patientIds: Guid[];
}
