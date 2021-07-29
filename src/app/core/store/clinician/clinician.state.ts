import { GridDataResult } from '@progress/kendo-angular-grid';
import { Clinician } from 'src/app/core/models/clinician.model';

export interface IClinicianState {
	clinician: Clinician | null;
}

export const initialClinicianState: IClinicianState = {
	clinician: null,
};
