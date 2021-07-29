import { GridDataResult } from '@progress/kendo-angular-grid';
import { Patient } from 'src/app/core/models/patient.model';

export interface IPatientState {
	patient: Patient | null;
	patients: GridDataResult | null;
	privatePersonLinks: {};
}

export const initialPatientState: IPatientState = {
	patient: null,
	patients: null,
	privatePersonLinks: {},
};
