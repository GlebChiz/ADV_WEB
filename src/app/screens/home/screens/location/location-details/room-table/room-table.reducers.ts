/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { RoomTableActions } from './room-table.actions';

const tableReducers: any = tableReducersFactory(
	RoomTableActions.UpdateRoomTableState,
	RoomTableActions.GetRoomTableDataPending,
	RoomTableActions.GetCurrentItemSuccess,
	RoomTableActions.GetRoomTableDataError,
	RoomTableActions.GetRoomTableDataSuccess,
	RoomTableActions.ClearCurrentRoom,
);

export function roomTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function roomInfoReducers(roomState: any, action: Action): any {
	return createReducer({})(roomState, action);
}

export const roomReducers: any = {
	table: roomTableReducers,
	roomInfo: roomInfoReducers,
};
