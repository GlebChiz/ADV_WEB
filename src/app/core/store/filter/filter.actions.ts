import { createAction, props } from '@ngrx/store';

export const FilterActions = {
	SetFilter: createAction('[Filter] Set Filter', props<{ id: string; filter: any }>()),
	OpenFilter: createAction('[Filter] Open Filter', props<{ id: string }>()),
	CloseFilter: createAction('[Filter] Close Filter', props<{ id: string }>()),
	TriggerFilter: createAction('[Filter] Trigger Filter', props<{ id: string }>()),
};
