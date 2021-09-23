/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { ILocationState } from 'src/app/shared/interfaces/location.interface';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { LocationTableActions } from './location-table.actions';

const initialLocationState: ILocationState = { selectedLocation: null };

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
	return createReducer(
		initialLocationState,
		on(
			LocationTableActions.GetSelectedLocationSuccess,
			(state: any, { selectedLocation }: { selectedLocation: any }) => {
				return { ...state, selectedLocation };
			},
		),
		on(LocationTableActions.ClearSelectedLocation, (state: any) => {
			return { ...state, selectedLocation: undefined };
		}),
	)(locationState, action);
}

export const locationReducers: any = {
	table: locationTableReducers,
	locationInfo: locationInfoReducers,
};
