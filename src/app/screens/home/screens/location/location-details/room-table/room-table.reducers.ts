/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
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
