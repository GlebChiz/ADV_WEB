export interface IPatientDetailsState {
	isLoading: boolean;
	current: any;
}

export const initialPateintDetailsState: IPatientDetailsState = {
	isLoading: false,
	current: {},
};
