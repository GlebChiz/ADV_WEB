import { Guid } from 'guid-typescript';
import { IPerson } from './person.model';

export interface IClinician {
	id: Guid;
	person: IPerson;
	userId: number | null;
	areaIds: Guid[];
	serviceTypeIds: Guid[];
}

export interface IClinicianEmpty {
	userId: null;
	person: IPerson;
}
