/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { PublicSnipitTableActions } from './public-snipit-table.actions';

const tableReducers: any = tableReducersFactory(
	PublicSnipitTableActions.UpdatePublicSnipitTableState,
	PublicSnipitTableActions.GetPublicSnipitTableDataPending,
	PublicSnipitTableActions.GetCurrentItemSuccess,
	PublicSnipitTableActions.GetPublicSnipitTableDataError,
	PublicSnipitTableActions.GetPublicSnipitTableDataSuccess,
	PublicSnipitTableActions.ClearCurrentPublicSnipit,
);

export function publicSnipitTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function publicSnipitInfoReducers(publicSnipitState: any, action: Action): any {
	return createReducer({})(publicSnipitState, action);
}

export const publicSnipitReducers: any = {
	table: publicSnipitTableReducers,
	publicSnipitInfo: publicSnipitInfoReducers,
};
