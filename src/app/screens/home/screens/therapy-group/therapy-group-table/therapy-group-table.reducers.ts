/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { TherapyGroupTableActions } from './therapy-group-table.actions';

const tableReducers: any = tableReducersFactory(
	TherapyGroupTableActions.UpdateTherapyGroupTableState,
	TherapyGroupTableActions.GetTherapyGroupTableDataPending,
	TherapyGroupTableActions.GetCurrentItemSuccess,
	TherapyGroupTableActions.GetTherapyGroupTableDataError,
	TherapyGroupTableActions.GetTherapyGroupTableDataSuccess,
	TherapyGroupTableActions.ClearCurrentTherapyGroup,
);

export function therapyGroupTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
