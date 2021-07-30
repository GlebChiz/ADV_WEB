import { IClinician } from 'src/app/core/models/clinician.model';

export interface IClinicianState {
	clinician: IClinician | null;
}

export const initialClinicianState: IClinicianState = {
	clinician: null,
};
