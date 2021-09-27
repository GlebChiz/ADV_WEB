export interface IFilter {
	countSkipItems: number;
	take: number;
	sort: ISort[];
}

export interface ISort {
	dir: string;
	field: string;
}
