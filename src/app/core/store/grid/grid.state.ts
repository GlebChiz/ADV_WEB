import { Guid } from 'guid-typescript';
import { ColumnFilter, ColumnSort, SortDirection } from '../../models/filters/column-filter.model';

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
export interface GridInfo {
	id: Guid | string;
	title: string;
	gridId: string;
	isDefault: boolean;
	columns: GridColumnInfo[];
	filters: ColumnFilter[];
	sorting: ColumnSort[];
}
export interface GridColumnInfo {
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

export interface GridButtonInfo {
	title: string;
	name: string;
	position: string;
}

export interface GridSettings {
	id: Guid;
	title: string;
	gridId: string;
	isDefault: boolean;
	columns: string;
	filters: string;
	sorting: string;
}
