export interface ISessionPlanDetailsState {
	isLoading: boolean;
	current: any;
}

export const initialSessionPlanDetailsState: ISessionPlanDetailsState = {
	isLoading: false,
	current: {},
};

// export interface IPatient {
// 	id: string;
// 	person: IPatientPerson[];
// }
