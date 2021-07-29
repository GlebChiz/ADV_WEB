import { Guid } from 'guid-typescript';
import { Person } from './person.model';

export interface Clinician {
	id: Guid;
	person: Person;
	userId: number | null;
	areaIds: Guid[];
	serviceTypeIds: Guid[];
}
