export interface IColumn {
	field: string;
	title: string;
	hidden: boolean;
	filterable: boolean;
	type: 'boolean' | 'text' | 'numeric' | 'date';
}
