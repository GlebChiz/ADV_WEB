export interface IPatientDetailsState {
	isLoading: boolean;
	current: any;
}

export const initialPateintDetailsState: IPatientDetailsState = {
	isLoading: false,
	current: {},
};

// export interface IPatient {
// 	id: string;
// 	person: IPatientPerson[];
// }
