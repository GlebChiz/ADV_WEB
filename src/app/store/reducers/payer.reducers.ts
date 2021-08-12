import { Action, createReducer, on } from '@ngrx/store';
import { PayerActions } from '../actions/payer.actions';
import { initialPayerState, IPayerState } from '../states/payer.state';

export function payerReducers(payerState: IPayerState | undefined, action: Action): IPayerState {
	return createReducer(
		initialPayerState,
		on(PayerActions.GetTypesSuccess, (state, payload) => {
			return { ...state, types: payload.types };
		}),
	)(payerState, action);
}
