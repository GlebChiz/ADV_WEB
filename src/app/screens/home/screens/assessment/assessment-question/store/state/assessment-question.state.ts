export interface IAssessmentQuestionState {
	isLoading: boolean;
	current: any;
}

export const initialAssessmentQuestionState: IAssessmentQuestionState = {
	isLoading: false,
	current: {},
};

// export interface IPatient {
// 	id: string;
// 	person: IPatientPerson[];
// }
