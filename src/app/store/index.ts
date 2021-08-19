import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { seriesPlanDropdownReducers } from './reducers/series-plan.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	seriesPlanDropdown: IDropDownState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	seriesPlanDropdown: seriesPlanDropdownReducers,
};
