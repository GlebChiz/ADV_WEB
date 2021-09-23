/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { UsersManagerTableActions } from './users-manager-table.actions';

const tableReducers: any = tableReducersFactory(
	UsersManagerTableActions.UpdateUserTableState,
	UsersManagerTableActions.GetUserTableDataPending,
	UsersManagerTableActions.GetCurrentItemSuccess,
	UsersManagerTableActions.GetUserTableDataError,
	UsersManagerTableActions.GetUserTableDataSuccess,
	UsersManagerTableActions.ClearCurrentUser,
);

export function userTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function userInfoReducers(userState: any, action: Action): any {
	return createReducer({})(userState, action);
}

export const usersReducers: any = {
	table: userTableReducers,
	modalityInfo: userInfoReducers,
};
