export interface ILocationState {
	selectedLocation: any;
}

export interface IInitiativeId {
	id: string;
	parentId: string | null;
	name: string;
	abbreviation: string;
	orderNumber: number;
	isDisabled: boolean;
}
