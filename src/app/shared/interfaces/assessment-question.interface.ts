export interface IAssessmentQuestion {
	id: string;
	orderNumber: number;
	text: string;
	translated?: boolean;
	legends: ILegend[];
}

export interface ILegend {
	abbreviation?: null;
	id: string;
	isDisabled: boolean;
	name: string;
	orderNumber: number;
	parentId: string | null;
}
