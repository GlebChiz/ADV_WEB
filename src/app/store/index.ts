import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { seriesPlanDropdownReducers } from './reducers/series-plan.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { supervisorLicenseDropdownReducers } from './reducers/supervisor-license.reducers';
import { supervisorLicensePayersDropdownReducers } from './reducers/supervisor-license-payers.reducers';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	seriesPlanDropdown: IDropDownState;
	supervisorDropdown: IDropDownState;
	payerDropdown: IDropDownState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	seriesPlanDropdown: seriesPlanDropdownReducers,
	supervisorDropdown: supervisorLicenseDropdownReducers,
	payerDropdown: supervisorLicensePayersDropdownReducers,
};
