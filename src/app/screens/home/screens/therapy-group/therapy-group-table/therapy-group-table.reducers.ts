/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { ITableState, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { initialTherapyGroupDetailsState } from '../therapy-group-details/store/state/therapy-group-details.state';
import { TherapyGroupTableActions } from './therapy-group-table.actions';

const tableReducers: any = tableReducersFactory(
	TherapyGroupTableActions.UpdateTherapyGroupTableState,
	TherapyGroupTableActions.GetTherapyGroupTableDataPending,
	TherapyGroupTableActions.GetCurrentItemSuccess,
	TherapyGroupTableActions.GetTherapyGroupTableDataError,
	TherapyGroupTableActions.GetTherapyGroupTableDataSuccess,
	TherapyGroupTableActions.ClearCurrentTherapyGroup,
);

export function therapyGroupTableReducers(
	state: ITableState<any, any, any> | undefined,
	action: Action,
): any {
	return tableReducers(state, action);
}

export function therapyRoomsReducers(therapyGroupDetailsState: any, action: Action): any {
	return createReducer(
		initialTherapyGroupDetailsState,
		on(TherapyGroupTableActions.GetRoomsSuccess, (state: any, data) => ({
			...state,
			...data.rooms,
			isLoading: true,
		})),
	)(therapyGroupDetailsState, action);
}

export const therapyGroupReducers: any = {
	table: therapyGroupTableReducers,
	rooms: therapyRoomsReducers,
};
