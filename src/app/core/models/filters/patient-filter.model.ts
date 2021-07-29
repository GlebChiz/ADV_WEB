import { Guid } from 'guid-typescript';

export interface PatientFilterModel {
	statusId: Guid | null;
	search: string;
	patientIds: Guid[];
}
