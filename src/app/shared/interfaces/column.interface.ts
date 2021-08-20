export interface IColumn {
	field: string;
	title: string;
	hidden: boolean;
	includeInChooser?: boolean;
	sortable?: boolean;
	filterable: boolean;
	type: 'boolean' | 'text' | 'numeric' | 'date';
}
