export interface IClinicanDetailsState {
	isLoading: boolean;
	current: any;
}

export const initialClinicanDetailsState: IClinicanDetailsState = {
	isLoading: false,
	current: {},
};

// export interface IPatient {
// 	id: string;
// 	person: IPatientPerson[];
// }
