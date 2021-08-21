export interface IAssessment {
	id: string;
	type: number;
	typeName?: string;
	modality: string;
	modalityId: string;
	patient?: string | undefined;
	patientName?: string | undefined;
}
