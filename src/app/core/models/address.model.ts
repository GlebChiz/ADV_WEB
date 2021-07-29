import { Guid } from 'guid-typescript';

export interface Address {
	id: Guid | null;
	address1: string;
	address2: string;
	zip: string;
	city: string;
	state: string;
	mapAddress: string;
	latitude: number | null;
	longitude: number | null;
}

export function FullAddress(address: Address): string {
	if (!address) {
		return '';
	}
	const street = `${address.address1} ${address.address2}`.trim();
	return `${street}, ${address.city}, ${address.state} ${address.zip}`;
}

export const MetaData = {
	address1: 'Street Address',
	address2: 'Apt',
	city: 'City',
	zip: 'Postal Code',
	state: 'State',
};
