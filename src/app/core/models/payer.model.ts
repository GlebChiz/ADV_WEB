import { Guid } from 'guid-typescript';
import { IAddress } from './address.model';

export interface IPayer {
	id: Guid | null;
	name: string;
	notes: string | null;
	type: string;
	payerId: string;
	address: IAddress | null;
	phone: string;
	fax: string;
	carrierCode: string;
}

export const MetaData = {
	name: 'Name',
	notes: 'Notes',
	type: 'Type',
	payerId: 'Payer Id',
	address: 'Address',
	phone: 'Phone',
	fax: 'Fax',
	carrierCode: 'Carrier Code',
};
