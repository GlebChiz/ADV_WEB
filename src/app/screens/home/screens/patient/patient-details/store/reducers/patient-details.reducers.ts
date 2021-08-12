import { Action, createReducer, on } from '@ngrx/store';
import { PatientDetailsActions } from '../actions/patient-details.actions';
import { initialPateintDetailsState, IPatientDetailsState } from '../state/patient-details.state';

export function patientDetailsReducers(
	patientDetailsState: IPatientDetailsState | undefined,
	action: Action,
): IPatientDetailsState {
	return createReducer(
		initialPateintDetailsState,
		on(PatientDetailsActions.GetPatientDetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			PatientDetailsActions.GetPatientDetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(PatientDetailsActions.GetPatientDetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(patientDetailsState, action);
}
