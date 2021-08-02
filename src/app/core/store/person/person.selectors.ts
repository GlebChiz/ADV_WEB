import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IPersonState } from './person.state';

const personState = (state: IAppState) => state.personState;

export const selectPersonPrivateLinks = createSelector(
	personState,
	(state: IPersonState | any, data: any) => {
		return state.privatePersonLinks[data.personId] || null;
	},
);

export const selectPersonModel = createSelector(
	personState,
	(state: IPersonState) => state?.person,
);

export const selectGeneralPersonModel = createSelector(
	personState,
	(state: IPersonState) => state?.generalPersonData,
);

export const selectPersonDemographicModel = createSelector(
	personState,
	(state: IPersonState) => state?.personDemographicData,
);

export const selectPersonContactsModel = createSelector(
	personState,
	(state: IPersonState) => state?.personContactsData,
);

export const selectPersonInsuranceModel = createSelector(
	personState,
	(state: IPersonState) => state?.personInsuranceData,
);
