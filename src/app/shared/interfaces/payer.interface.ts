export interface IPayerType {
	abbreviation?: null;
	id: string;
	isDisabled: boolean;
	name: string;
	orderNumber?: number;
	parentId: string | null;
	parentName: string | null;
}
