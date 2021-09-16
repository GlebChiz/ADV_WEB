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
	LogOut: createAction('[Auth] Log out'),
	LogOutComplete: createAction('[Auth] Log out complete'),
	LogOutError: createAction('[Auth] Log out error'),
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
	GetUserAvatarPending: createAction('[Auth] Get user avatar pending', props<{ id: number }>()),
	GetUserAvatarError: createAction('[Auth] Get user avatar error', props<{ errors: any }>()),
	GetUserAvatarSuccess: createAction('[Auth] Get user avatar success', props<{ url: any }>()),
};

export interface IUser {
	id: Guid;
	userId: number;
	userName: string;
	urlAvatar: string;
	name: string;
	token: string;
	success: true;
	permissions: PermissionType[];
	sharedCallId: Guid | null;
	roles: number[]; // TODO
}

export const enum CacheSection {
	All = 0,
	Service = 1,
	Form = 2,
	Lookup = 3,
}

export const enum PermissionType {
	canViewAssessmentManager = 10,
	canReadAssessment = 11,
	canCreateAssessment = 12,
	canUpdateAssessment = 13,
	canDeleteAssessment = 14,
	canViewAssessmentLegendManager = 20,
	canReadAssessmentLegend = 21,
	canCreateAssessmentLegend = 22,
	canUpdateAssessmentLegend = 23,
	canDeleteAssessmentLegend = 24,
	canViewLocationManager = 30,
	canReadLocation = 31,
	canCreateLocation = 32,
	canUpdateLocation = 33,
	canDeleteLocation = 34,
	canViewPayerManager = 40,
	canReadPayer = 41,
	canCreatePayer = 42,
	canUpdatePayer = 43,
	canDeletePayer = 44,
	canViewModalityManager = 50,
	canReadModality = 51,
	canCreateModality = 52,
	canUpdateModality = 53,
	canDeleteModality = 54,
	canViewSeriesPlanManager = 60,
	canReadSeriesPlan = 61,
	canCreateSeriesPlan = 62,
	canUpdateSeriesPlan = 63,
	canDeleteSeriesPlan = 64,
	canViewSessionPlanManager = 70,
	canReadSessionPlan = 71,
	canCreateSessionPlan = 72,
	canUpdateSessionPlan = 73,
	canDeleteSessionPlan = 74,
	canViewPublicSnipitManager = 80,
	canReadPublicSnipit = 81,
	canCreatePublicSnipit = 82,
	canUpdatePublicSnipit = 83,
	canDeletePublicSnipit = 84,
	canViewSupervisorCredentialsManager = 90,
	canReadSupervisorCredentials = 91,
	canCreateSupervisorCredentials = 92,
	canUpdateSupervisorCredentials = 93,
	canDeleteSupervisorCredentials = 94,
	canViewPatientDistributionManager = 100,
	canReadPatientDistribution = 101,
	canCreatePatientDistribution = 102,
	canUpdatePatientDistribution = 103,
	canDeletePatientDistribution = 104,
	canViewUnsupervisedServiceManager = 110,
	canReadUnsupervisedService = 111,
	canCreateUnsupervisedService = 112,
	canUpdateUnsupervisedService = 113,
	canDeleteUnsupervisedService = 114,
	canViewTherapyGroupManager = 120,
	canReadTherapyGroup = 121,
	canCreateTherapyGroup = 122,
	canUpdateTherapyGroup = 123,
	canDeleteTherapyGroup = 124,
	canViewClinicianManager = 130,
	canReadClinician = 131,
	canCreateClinician = 132,
	canUpdateClinician = 133,
	canDeleteClinician = 134,
	canViewPatientManager = 140,
	canReadPatient = 141,
	canCreatePatient = 142,
	canUpdatePatient = 143,
	canDeletePatient = 144,
}

export const enum RoleType {}
