export interface IDropDownData {
	id: string;
	name: string;
	isDisabled: boolean;
	parentId: string;
}

export const LookupTypeCodes = {
	area: 'Area',
	patientStatus: 'PatientStatus',
	language: 'Language',
	gender: 'Gender',
	race: 'Race',
	sex: 'Sex',
	marital: 'MaritalStatus',
	employement: 'Employement',
	raceIds: 'Race',
	phonePolicy: 'PhonePolicy',
	phoneType: 'PhoneType',
	payerType: 'PayerType',
};

export const FormTypeLookupCodes = {
	PatientForms: 'PatientForms',
};
