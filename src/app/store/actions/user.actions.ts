import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';

export const AuthUserActions = {
	SignIn: createAction(
		'[Auth] SignIn',
		props<{ login: string | undefined; password: string | undefined }>(),
	),
	SignInComplete: createAction('[Auth] SignInComplete', props<{ user: IUser }>()),
	SignInError: createAction('[Auth] SignInError', props<{ errors: any }>()),
	CheckToken: createAction('[Auth] CheckToken'),
	CheckTokenError: createAction('[Auth] CheckTokenError', props<{ errors: any }>()),
};

export const UserActions = {
	NewUserModel: createAction('[User] New User Model'),
	GetUserModel: createAction('[User] Get User Model', props<{ id: number | null }>()),
	GetUserModelSuccess: createAction('[User] Get User Model Success', props<{ user: IUser }>()),
	GetUserModelFail: createAction('[User] Get User Model Fail'),
	UpdateUser: createAction('[User] Update User', props<IUser>()),
	UpdateUserComplete: createAction('[User] Update User Compete'),
	UpdateUserFail: createAction('[User] Update User Fail', props<{ errors: any }>()),
	CreateUser: createAction('[User] Create User', props<{ user: IUser }>()),
	CreateUserComplete: createAction('[User] Create User Compete', props<{ id: number }>()),
};

export interface IUser {
	userId: number;
	userName: string;
	// userNameId: string;
	name: string;
	token: string;
	success: true;
	permissions: PermissionType[];
	sharedCallId: Guid | null;
	roles: number[]; // TODO
	// person: IPerson;
}

export const enum CacheSection {
	All = 0,
	Service = 1,
	Form = 2,
	Lookup = 3,
}

export const enum PermissionType {
	CanViewPatientList = 1,
	CanViewPayerList = 2,
	CanViewNewCall = 3,
	CanViewActiveCall = 4,
	CanViewMyCalls = 5,
	CanViewClinicianList = 6,
	CanViewMyServicesClinician = 11,
}
