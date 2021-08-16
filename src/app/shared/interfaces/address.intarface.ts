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
