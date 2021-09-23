import { Address } from 'src/app/shared/interfaces/address.intarface';

export interface ILocationState {
	selectedLocation: ILocation | undefined;
}
export interface ILocation {
	address: Address;
	billingCode: string;
	code: string;
	id: string;
	initiativeIds: string[];
	isSchool: boolean;
	name: string;
	roomCount: number;
}

export interface IInitiativeId {
	id: string;
	parentId: string | null;
	name: string;
	abbreviation: string;
	orderNumber: number;
	isDisabled: boolean;
}
