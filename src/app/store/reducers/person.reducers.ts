import { Action, createReducer, on } from '@ngrx/store';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';

import { IPersonDemographicInfo } from 'src/app/shared/components/demografic/demographic.component';
import { IPersonState } from 'src/app/shared/interfaces/person.interface';
import { PersonActions } from '../actions/person.actions';

const initialPersonState: IPersonState = { personDemographicInfo: {}, personContactInfo: {} };


export function personReducers(
	locationState: IPersonState | undefined,
	action: Action,
): IPersonState {
	return createReducer(
		initialPersonState,
		on(
			PersonActions.GetPersonDemographicInfoSuccess,
			(
				state: IPersonState,
				{ personDemographicInfo }: { personDemographicInfo: IPersonDemographicInfo },
			) => {
				return { ...state, personDemographicInfo };
			},
		),
		on(
			PersonActions.GetPersonContactInfoSuccess,
			(state: IPersonState, { personContactInfo }: { personContactInfo: IPersonContactInfo }) => {
				return { ...state, personContactInfo };
			},
		),

	)(locationState, action);
}
