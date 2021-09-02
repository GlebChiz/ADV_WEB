import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { ILocationState } from '../shared/interfaces/location.interface';
import { locationReducers } from './reducers/location.reducers';
import { dropdownReducers } from './reducers/dropdown.reducers';
import { personReducers } from './reducers/person.reducers';
import { IPersonState } from '../shared/interfaces/person.interface';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	location: ILocationState;
	dropdown: IDropDownState;
	person: IPersonState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	location: locationReducers,
	dropdown: dropdownReducers,
	person: personReducers,
};
