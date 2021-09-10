/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { SeriesplansTableActions } from './series-plan-table.actions';

const tableReducers: any = tableReducersFactory(
	SeriesplansTableActions.UpdateSeriesplansTableState,
	SeriesplansTableActions.GetSeriesplansTableDataPending,
	SeriesplansTableActions.GetCurrentItemSuccess,
	SeriesplansTableActions.GetSeriesplansTableDataError,
	SeriesplansTableActions.GetSeriesplansTableDataSuccess,
	SeriesplansTableActions.ClearCurrentSeriesplans,
);

export function seriesplansTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function seriesplansInfoReducers(seriesplansState: any, action: Action): any {
	return createReducer({})(seriesplansState, action);
}

export const seriesplansReducers: any = {
	table: seriesplansTableReducers,
	seriesplansInfo: seriesplansInfoReducers,
};
