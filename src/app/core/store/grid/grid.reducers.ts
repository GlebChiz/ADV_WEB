import { Action, createReducer, on } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { GridActions } from './grid.actions';
import { IGridState, initialGridState } from './grid.state';

export function gridReducers(gridState: IGridState | undefined, action: Action): IGridState {
	return createReducer(
		initialGridState,
		on(GridActions.ReloadGrid, (state, payload) => {
			const newState = { ...state };
			newState.gridUpdate[payload.gridId] = Guid.create();
			return newState;
		}),
		on(GridActions.ResetList, (state, payload) => {
			const newState = { ...state };
			newState.gridData[payload.gridId] = null;
			newState.gridCheckedLines[payload.gridId] = null;
			newState.gridCheckAll[payload.gridId] = null;
			return newState;
		}),
		on(GridActions.CheckAll, (state, payload) => {
			const newState = { ...state };
			const rows = newState.gridData[payload.gridId]?.data || [];
			const checks: any = {};
			if (rows && rows.length > 0) {
				rows.forEach((r: any) => {
					checks[r['grid-uid']] = payload.checked;
				});
			}
			newState.gridCheckedLines[payload.gridId] = checks;
			newState.gridCheckAll[payload.gridId] = payload.checked;
			return newState;
		}),
		on(GridActions.CheckRow, (state, payload) => {
			const newState = { ...state };
			const rows = newState.gridCheckedLines[payload.gridId] || {};
			rows[payload.gridUID] = payload.checked;
			newState.gridCheckedLines[payload.gridId] = rows;
			newState.gridCheckAll[payload.gridId] = null;
			return newState;
		}),
		on(GridActions.GetListSuccess, (state, payload) => {
			const newState = { ...state };
			newState.gridData[payload.gridId] = payload.data;
			newState.gridCheckedLines[payload.gridId] = null;
			return newState;
		}),
		on(GridActions.SetGridInfo, (state, payload) => {
			const newState = { ...state };
			newState.gridView[payload.gridId] = {
				id: payload.grid.id,
				title: payload.grid.title,
				gridId: payload.grid.gridId,
				isDefault: payload.grid.isDefault,
			};
			newState.gridColumns[payload.gridId] = { ...payload.grid.columns };
			newState.gridFilters[payload.gridId] = { ...payload.grid.filters };
			newState.gridSorting[payload.gridId] = { ...payload.grid.sorting };
			return newState;
		}),
		on(GridActions.SetGridSorting, (state, payload) => {
			const newState = { ...state };
			newState.gridSorting[payload.gridId] = { ...payload.sorting };
			return newState;
		}),
		on(GridActions.GetSelectedItemModel, (state, payload) => {
			const newState = { ...state };
			newState.selectedItems[payload.gridId] = null;
			return newState;
		}),
		on(GridActions.ResetSelectedItemModel, (state, payload) => {
			const newState = { ...state };
			newState.selectedItems[payload.gridId] = null;
			return newState;
		}),
		on(GridActions.GetSelectedItemModelSuccess, (state, payload) => {
			const newState = { ...state };
			newState.selectedItems[payload.gridId] = payload.model;
			return newState;
		}),
		on(GridActions.SetColumnFilterValue, (state, payload) => {
			const newState = { ...state };
			const filters = newState.gridFilters[payload.gridId] || {};
			const filter = filters[payload.name] || null;
			if (filter) {
				filters[payload.name] = { ...filter, data: payload.data };
			}
			newState.gridFilters[payload.gridId] = { ...filters };
			return { ...newState };
		}),
		on(GridActions.SetColumnFilterType, (state, payload) => {
			const newState = { ...state };
			const filters = newState.gridFilters[payload.gridId] || {};
			const filter = filters[payload.name] || null;
			if (filter) {
				filters[payload.name] = { ...filter, type: payload.filterType };
			}
			newState.gridFilters[payload.gridId] = { ...filters };
			return { ...newState };
		}),
		on(GridActions.SetColumnSortingDirection, (state, payload) => {
			const newState = { ...state };
			const sorting = newState.gridSorting[payload.gridId] || {};
			const sort = sorting[payload.name] || null;
			if (sort) {
				sorting[payload.name] = { ...sort, direction: payload.direction };
			}
			newState.gridSorting[payload.gridId] = { ...sorting };
			return { ...newState };
		}),
		on(GridActions.SetColumnVisability, (state, payload) => {
			const newState = { ...state };
			const columns = newState.gridColumns[payload.gridId] || {};
			const col = columns[payload.name] || null;
			if (col) {
				columns[payload.name] = { ...col, visible: payload.visible };
			}
			newState.gridColumns[payload.gridId] = { ...columns };
			return { ...newState };
		}),
		on(GridActions.SetSorting, (state, payload) => {
			const newState = { ...state };
			newState.gridSorting[payload.gridId] = { ...payload.sorting };
			return { ...newState };
		}),
	)(gridState, action);
}
