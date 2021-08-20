export interface ISupervisorType {
	id: string;
	supervisor: string;
	payer: string;
	start: string;
	end: string | null;
	providerId: string | null;
}
