export interface ISupervisorPayerType {
	id: string;
	parendId: string | null;
	name: string;
	abbreviation: string | null;
	orderNumber: number | null;
	isDisabled: boolean;
}
