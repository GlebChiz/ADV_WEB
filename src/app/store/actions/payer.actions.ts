import { createAction, props } from '@ngrx/store';
import { IPayerType } from 'src/app/shared/interfaces/payer.interface';

export const PayerActions = {
	GetTypesPending: createAction('[Payer] Get types pending'),
	GetTypesError: createAction('[Payer] Get types error'),
	GetTypesSuccess: createAction('[Payer] Get types success', props<{ types: IPayerType[] }>()),
};
