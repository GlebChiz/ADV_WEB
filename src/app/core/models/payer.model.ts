import { Guid } from 'guid-typescript';
import { Address } from './address.model';

export interface Payer {
	id: Guid | null;
	name: string;
	notes: string | null;
	type: string;
	payerId: string;
	address: Address | null;
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
