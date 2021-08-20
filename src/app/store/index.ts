import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { ILocationState } from '../shared/interfaces/location.interface';
import { locationReducers } from './reducers/location.reducers';
import { dropdownReducers } from './reducers/dropdown.reducers';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	location: ILocationState;
	dropdown: IDropDownState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	location: locationReducers,
	dropdown: dropdownReducers,
};
