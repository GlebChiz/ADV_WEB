import { ITranslated } from 'src/app/screens/home/screens/assessment-legend/assessment-legend-table/assessment-legend-table.component';

export interface IAssessmentQuestion extends ITranslated {
	id: string;
	orderNumber: number;
	text: string;
	translated?: boolean;
	legends: ILegend[];
	templateCount: number;
}

export interface ILegend {
	abbreviation?: null;
	id: string;
	isDisabled: boolean;
	name: string;
	orderNumber: number;
	parentId: string | null;
}

export interface IAssessmentTemplate {
	questionId: string;
	responseOption: string;
	text: string;
	type: string;
}
