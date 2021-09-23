import { IUser, PermissionType } from '../actions/user.actions';

export interface IUserState {
	user: IUser | undefined;
	permissions: PermissionType[];
	editing: IUser | undefined;
}

export const initialUserState: IUserState = {
	user: undefined,
	permissions: [],
	editing: undefined,
};
