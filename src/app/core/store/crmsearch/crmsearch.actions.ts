import { createAction, props } from '@ngrx/store';
import { ICall } from '../../models/call.model';
import { ICRMPersonFound, ICRMSearch } from '../../models/crm-search.model';

export const CRMSearchActions = {
	Reset: createAction('[CRMSearch] Reset', props<{ search: ICRMSearch }>()),
	ResetResult: createAction('[CRMSearch] Reset Result'),
	SetCall: createAction('[CRMSearch] Set Call', props<{ call: ICall }>()),
	AddPhone: createAction('[CRMSearch] Add Phone', props<{ key: string; phone: string }>()),
	AddLastname: createAction('[CRMSearch] Add Lastname', props<{ key: string; lastname: string }>()),
	AddCallerId: createAction('[CRMSearch] Add Caller Id', props<{ key: string; value: string }>()),

	AddResult: createAction('[CRMSearch] Add Result', props<{ items: ICRMPersonFound[] }>()),
};
