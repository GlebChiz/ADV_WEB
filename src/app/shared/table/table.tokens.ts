import { InjectionToken } from '@angular/core';

export const GET_TABLE_DATA_PENDING: InjectionToken<string> = new InjectionToken(
	'GET_TABLE_DATA_PENDING',
);

export const DELETE_ITEM_TABLE_PENDING: InjectionToken<string> = new InjectionToken(
	'DELETE_ITEM_TABLE_PENDING',
);

export const DELETE_ITEM_TABLE_ERROR: InjectionToken<string> = new InjectionToken(
	'DELETE_ITEM_TABLE_ERROR',
);

export const DUBLICATE_ITEM_TABLE_PENDING: InjectionToken<string> = new InjectionToken(
	'DUBLICATE_ITEM_TABLE_PENDING',
);

export const EDIT_ITEM_TABLE_PENDING: InjectionToken<string> = new InjectionToken(
	'EDIT_ITEM_TABLE_PENDING',
);

export const CREATE_ITEM_TABLE_PENDING: InjectionToken<string> = new InjectionToken(
	'CREATE_ITEM_TABLE_PENDING',
);
export const GET_CURRENT_ITEM_PENDING: InjectionToken<string> = new InjectionToken(
	'GET_CURRENT_ITEM_PENDING',
);

export const UPDATE_TABLE_STATE: InjectionToken<string> = new InjectionToken('UPDATE_TABLE_STATE');
