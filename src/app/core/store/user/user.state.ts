import { PermissionType } from 'src/app/core/enums/permission.type';
import { User } from 'src/app/core/models/user.model';

export interface IUserState {
	user: User | null;
	permissions: PermissionType[];
	editing: User | null;
}

export const initialUserState: IUserState = {
	user: null,
	permissions: [],
	editing: null,
};
