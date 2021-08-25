export interface ITherapyGroupDetailsState {
	isLoading: boolean;
	current: any;
}

export const initialTherapyGroupDetailsState: ITherapyGroupDetailsState = {
	isLoading: false,
	current: {},
};

// export interface IPatient {
// 	id: string;
// 	person: IPatientPerson[];
// }
