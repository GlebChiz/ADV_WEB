export interface IColumn {
	field: string;
	title: string;
	hidden: boolean;
	includeInChooser?: boolean;
	groupable?: boolean;
	sortable?: boolean;
	filterable: boolean;
	type: 'boolean' | 'text' | 'numeric' | 'date';
	style?: { [klass: string]: string };
	headerStyle?: { [klass: string]: string };
}
