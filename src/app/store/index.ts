import { ActionReducerMap } from '@ngrx/store';
import { userReducers } from './reducers/user.reducers';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { dropdownReducers } from './reducers/dropdown.reducers';
import { personReducers } from './reducers/person.reducers';
import { IPersonState } from '../shared/interfaces/person.interface';

export interface IStore {
	userState: IUserState;
	dropdown: IDropDownState;
	person: IPersonState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	dropdown: dropdownReducers,
	person: personReducers,
};
