import { Guid } from 'guid-typescript';

export enum InsuranceOrderType {
	Unknown = 0,
	Primary = 1,
	Secondary = 2,
}

export enum InsuredParty {
	Self = 0,
	Spouse = 1,
	Child = 2,
	LifePartner = 3,
	Other = 4,
}

export interface Insurance {
	id: string;
	payerId: Guid;
	copay: number | null;
	deductible: number | null;
	memberId: string;
	policyGroup: string;
	employee: string;
	planName: string;
	insuredParty: InsuredParty;
	orderType: InsuranceOrderType;
	insuranceHolderId: Guid | null;
	exists: boolean;
	personId: Guid;
	patientId: string | null;
	verificationDate: Date | null;
	isVerified: boolean;
}

export interface InsuranceSaveModel {
	primaryInsurance: Insurance;
	secondaryInsurance: Insurance;
}

export const MetaData = {
	payerId: 'Payer',
	copay: 'Copay',
	deductible: 'Deductible',
	memberId: 'Member Id',
	policyGroup: 'Policy Group',
	employee: 'Employer/School',
	planName: 'Plan Name',
	insuranceHolderId: 'Insured Party',
};
