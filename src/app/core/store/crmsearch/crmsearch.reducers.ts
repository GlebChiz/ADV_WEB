import { Action, createReducer, on } from '@ngrx/store';
import { CRMSearch } from '../../models/crm-search.model';
import { CRMSearchActions } from './crmsearch.actions';
import { ICRMSearchState, initialCRMSearchState } from './crmsearch.state';

export function crmSearchReducers(
	crmSearchState: ICRMSearchState | undefined,
	action: Action,
): ICRMSearchState {
	return createReducer(
		initialCRMSearchState,
		on(CRMSearchActions.Reset, (state, payload) => {
			return { ...state, search: payload.search };
		}),
		on(CRMSearchActions.AddPhone, (state, payload) => {
			const isValidPhone = payload.phone && /^\d{10}$/.test(payload.phone);
			const phones = state.search?.phones || {};

			if (isValidPhone === true) {
				if (phones[payload.key] === payload.phone) {
					return state;
				}
				phones[payload.key] = payload.phone;
			} else {
				if (!phones[payload.key]) {
					return state;
				}
				delete phones[payload.key];
			}
			const search = { ...(state?.search || {}), phones };
			return { ...state, search };
		}),
		on(CRMSearchActions.AddLastname, (state, payload) => {
			const lastnames = state.search?.lastnames || {};
			if (payload.lastname && payload.lastname.length > 0) {
				if (lastnames[payload.key] === payload.lastname) {
					return state;
				}
				lastnames[payload.key] = payload.lastname;
			} else {
				if (!lastnames[payload.key]) {
					return state;
				}
				delete lastnames[payload.key];
			}
			const search = { ...(state?.search || {}), lastnames };
			return { ...state, search };
		}),
		on(CRMSearchActions.AddCallerId, (state, payload) => {
			if (state?.search.callerId === payload.value) {
				return state;
			}
			const callerId = payload.value || null;
			const search = { ...(state?.search || {}), callerId };
			return { ...state, search };
		}),

		on(CRMSearchActions.SetCall, (state, payload) => {
			const search = { ...(state.search || ({} as CRMSearch)) };
			search.call = payload.call;
			return { ...state, search };
		}),
	)(crmSearchState, action);
}
