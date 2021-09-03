import { Action, createReducer, on } from '@ngrx/store';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from 'src/app/shared/components/demografic/demographic.component';
import { IPersonState } from 'src/app/shared/interfaces/person.interface';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';
import { PersonActions } from '../actions/person.actions';

const initialPersonState: IPersonState = {
	personDemographicInfo: {},
	personInfo: {},
	personContactInfo: {},
};

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
			PersonActions.GetPersonInfoSuccess,
			(state: IPersonState, { personInfo }: { personInfo: IPersonInfo }) => {
				return { ...state, personInfo };
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
