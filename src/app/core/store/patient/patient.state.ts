import { GridDataResult } from '@progress/kendo-angular-grid';
import { IPatient } from 'src/app/core/models/patient.model';

export interface IPatientState {
	patient: IPatient | null;
	patients: GridDataResult | null;
	privatePersonLinks: {};
}

export const initialPatientState: IPatientState = {
	patient: null,
	patients: null,
	privatePersonLinks: {},
};
