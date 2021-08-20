import { IDropdownData } from './dropdown.interface';

export interface ISessionPlan {
	id: string;
	orderNumber: number;
	title: string;
	translated: number;
	seriesPlans: IDropdownData[];
}
