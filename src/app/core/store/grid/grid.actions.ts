import { createAction, props } from '@ngrx/store';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
	ColumnFilterType,
	ColumnSort,
	SortDirection,
} from '../../models/filters/column-filter.model';
import { GridInfo } from './grid.state';

export const GridActions = {
	CheckAll: createAction('[Grid] Check All', props<{ gridId: string; checked: boolean }>()),
	CheckRow: createAction(
		'[Grid] Check Row',
		props<{ gridId: string; gridUID: string; checked: boolean }>(),
	),
	ReloadGrid: createAction('[Grid] Reload list', props<{ gridId: string }>()),
	ResetList: createAction('[Grid] Reset list', props<{ gridId: string }>()),
	GetList: createAction(
		'[Grid] Get list',
		props<{ gridId: string; state: any; controller: string; filter: any }>(),
	),
	GetListSuccess: createAction(
		'[Grid] Get list success',
		props<{ gridId: string; data: GridDataResult }>(),
	),

	SetGridInfo: createAction('[Grid] Set grid info', props<{ gridId: string; grid: GridInfo }>()),
	SetColumnFilterValue: createAction(
		'[Grid] Set column filter value',
		props<{ gridId: string; name: string; data: any }>(),
	),
	SetColumnFilterType: createAction(
		'[Grid] Set column filter type',
		props<{ gridId: string; name: string; filterType: ColumnFilterType }>(),
	),
	SetColumnSortingDirection: createAction(
		'[Grid] Set column sorting direction',
		props<{ gridId: string; name: string; direction: SortDirection }>(),
	),
	SetGridSorting: createAction(
		'[Grid] Set grid sorting',
		props<{ gridId: string; sorting: any }>(),
	),
	SetColumnVisability: createAction(
		'[Grid] Set column visability',
		props<{ gridId: string; name: string; visible: boolean }>(),
	),

	GetSelectedItemModel: createAction(
		'[Grid] Get Selected Item Model',
		props<{ gridId: string; controller: string; model: any }>(),
	),
	GetSelectedItemModelSuccess: createAction(
		'[Grid] Get Selected Item Model Success',
		props<{ gridId: string; model: any }>(),
	),
	GetSelectedItemModelFail: createAction('[Grid] Get Selected Item Model Fail'),
	ResetSelectedItemModel: createAction(
		'[Grid] Reset Selected Item Model',
		props<{ gridId: string }>(),
	),

	SetSorting: createAction(
		'[Grid] Set sorting',
		props<{ gridId: string; sorting: ColumnSort[] }>(),
	),
};
