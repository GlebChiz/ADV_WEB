import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IGridState } from './grid.state';

const gridState = (state: IAppState) => state.gridState;

export const selectGridData = createSelector(gridState, (state: IGridState, data: any) => {
	return state.gridData[data.gridId] || null;
});

export const selectGridUpdate = createSelector(gridState, (state: IGridState, data: any) => {
	return state.gridUpdate[data.gridId];
});

export const selectGridInfo = createSelector(gridState, (state: IGridState, data: any) => {
	return {
		id: state.gridView[data.gridId]?.id,
		title: state.gridView[data.gridId]?.title,
		isDefault: state.gridView[data.gridId]?.isDefault,
		gridId: state.gridView[data.gridId]?.gridId,
		columns: state.gridColumns[data.gridId] || null,
		filters: state.gridFilters[data.gridId] || null,
		sorting: state.gridSorting[data.gridId] || null,
	};
});

export const selectGridFilter = createSelector(gridState, (state: IGridState, data: any) => {
	const filters = state.gridFilters[data.gridId] || {};
	const result = filters[data.name] || null;
	return result;
});

export const selectCheckedAll = createSelector(gridState, (state: IGridState, data: any) => {
	return state.gridCheckAll[data.gridId] || false;
});

export const selectCheckedRows = createSelector(gridState, (state: IGridState, data: any) => {
	return state.gridCheckedLines[data.gridId] || {};
});

export const selectCheckedItems = createSelector(gridState, (state: IGridState, data: any) => {
	const newState = { ...state };
	const rows = newState.gridData[data.gridId]?.data || [];
	const items: any[] = [];
	if (rows && rows.length > 0) {
		rows.forEach((r: any) => {
			if (newState.gridCheckedLines[r['grid-uid']]) {
				items.push(r);
			}
		});
	}

	return items;
});

export const selectGridSorting = createSelector(gridState, (state: IGridState, data: any) => {
	const sorting = state.gridSorting[data.gridId] || {};
	const result = sorting[data.name] || null;
	return result;
});

export const selectGridSelectedItem = createSelector(gridState, (state: IGridState, data: any) => {
	return state.selectedItems[data.gridId] || null;
});
