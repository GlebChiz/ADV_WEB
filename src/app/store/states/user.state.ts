import { IUser, PermissionType } from '../actions/user.actions';

export interface IUserState {
	user: IUser | null;
	permissions: PermissionType[];
	editing: IUser | null;
	urlAvatar: any;
}

export const initialUserState: IUserState = {
	user: null,
	permissions: [],
	editing: null,
	urlAvatar: null,
};
