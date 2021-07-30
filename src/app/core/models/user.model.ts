import { Guid } from 'guid-typescript';
import { PermissionType } from '../enums/permission.type';
import { IPerson } from './person.model';

export interface IUser {
	userId: number;
	userName: string;
	userNameId: string;
	name: string;
	token: string;
	success: true;
	permissions: PermissionType[];
	sharedCallId: Guid | null;
	person: IPerson;
}

export enum CacheSection {
	All = 0,
	Service = 1,
	Form = 2,
	Lookup = 3,
}
