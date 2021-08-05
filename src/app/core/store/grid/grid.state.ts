import { Guid } from 'guid-typescript';
import {
	IColumnFilter,
	IColumnSort,
	SortDirection,
} from '../../models/filters/column-filter.model';

export interface IGridState {
	gridData: any;
	gridCheckAll: any;
	gridCheckedLines: any;
	gridColumns: any;
	gridView: any;
	gridFilters: any;
	selectedItems: any;
	gridColumnVisibility: any;
	gridUpdate: any;
	gridSorting: any;
}

export const initialGridState: IGridState = {
	gridData: {},
	gridCheckAll: {},
	gridCheckedLines: {},
	gridColumns: {},
	gridView: {},
	gridFilters: {},
	gridColumnVisibility: {},
	selectedItems: {},
	gridUpdate: {},
	gridSorting: {},
};

export interface IGridColumns {
    [key: string]: IGridColumnInfo;
}

export interface IGridFilters {
    [key: string]: IColumnFilter;
}

export interface IGridSortings {
    [key: string]: IColumnSort;
}

export interface IGridInfo {
	id: Guid | string;
	title: string;
	gridId: string;
	isDefault: boolean;
	columns: IGridColumns;
	filters: IGridFilters;
	sorting: IGridSortings;
}
export interface IGridInfoJsonFormat {
	id: Guid | string;
	title: string;
	gridId: string;
	isDefault: boolean;
	columns: string;
	filters: string;
	sorting: string;
}
export interface IGridColumnInfo {
	name: string;
	title: string;
	visible: boolean;
	filter: any;
	link: boolean;
	click: boolean;
	dataType: string;
	format: string;
	groupable: boolean;
	sortDirection: SortDirection | null;
	sortOrder: number | null;
}

export interface IGridButtonInfo {
	title: string;
	name: string;
	position: string;
}

export interface IGridSettings {
	id: Guid;
	title: string;
	gridId: string;
	isDefault: boolean;
	columns: string;
	filters: string;
	sorting: string;
}

export interface IGridId {
	gridId: string | null;
}
