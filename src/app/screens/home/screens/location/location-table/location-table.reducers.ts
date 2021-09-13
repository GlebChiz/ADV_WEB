/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { LocationTableActions } from './location-table.actions';

const tableReducers: any = tableReducersFactory(
	LocationTableActions.UpdateLocationTableState,
	LocationTableActions.GetLocationTableDataPending,
	LocationTableActions.GetCurrentItemSuccess,
	LocationTableActions.GetLocationTableDataError,
	LocationTableActions.GetLocationTableDataSuccess,
	LocationTableActions.ClearCurrentLocation,
);

export function locationTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function locationInfoReducers(locationState: any, action: Action): any {
	return createReducer({})(locationState, action);
}

export const locationReducers: any = {
	table: locationTableReducers,
	locationInfo: locationInfoReducers,
};
