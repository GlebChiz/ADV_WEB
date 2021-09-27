import { FilterDescriptor } from '@progress/kendo-data-query';
import { IGridSort } from './sort.interface';

export interface IGridSettings {
	columns: string[];
	filters: FilterDescriptor[];
	gridId: string;
	id: string;
	isDefault: boolean;
	skip: number;
	sorting: IGridSort[];
	take: number;
	title: string;
	userId: number;
}
