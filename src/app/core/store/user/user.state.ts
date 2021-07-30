import { PermissionType } from 'src/app/core/enums/permission.type';
import { IUser } from 'src/app/core/models/user.model';

export interface IUserState {
	user: IUser | null;
	permissions: PermissionType[];
	editing: IUser | null;
}

export const initialUserState: IUserState = {
	user: null,
	permissions: [],
	editing: null,
};
