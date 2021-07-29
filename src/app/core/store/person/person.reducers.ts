import { Action, createReducer, on } from '@ngrx/store';
import { PersonActions } from './person.actions';
import { IPersonState, initialPersonState } from './person.state';

export function personReducers(
	personState: IPersonState | undefined,
	action: Action,
): IPersonState {
	return createReducer(
		initialPersonState,
		on(PersonActions.GetPrivatePersonLinksSuccess, (state, payload) => {
			const newState = { ...state };
			newState.privatePersonLinks[payload.personId.toString()] = payload.data;
			return newState;
		}),
		on(PersonActions.GetPersonModel, (state) => ({ ...state, person: null })),
		on(PersonActions.GetPersonModelSuccess, (state, payload) => ({
			...state,
			person: payload.person,
		})),
		on(PersonActions.GetGeneralPersonModelSuccess, (state, payload) => ({
			...state,
			generalPersonData: payload.person,
		})),
		on(PersonActions.GetPersonContactsModelSuccess, (state, payload) => ({
			...state,
			personContactsData: payload.person,
		})),
		on(PersonActions.GetPersonDemographicModelSuccess, (state, payload) => ({
			...state,
			personDemographicData: payload.person,
		})),
		on(PersonActions.GetInsurancePersonModelSuccess, (state, payload) => ({
			...state,
			personInsurancesData: payload.insurances,
		})),
	)(personState, action);
}
