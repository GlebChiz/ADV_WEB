import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { seriesPlanDropdownReducers } from './reducers/series-plan.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import {
	supervisorLicenseDropdownReducers,
	// supervisorReducers,
} from './reducers/supervisor-license.reducers';
import { locationDropdownReducers } from './reducers/location-initiative-ids.reducers';
import { roomDropdownReducers } from './reducers/room.reducers';
// import { ISupervisorState } from './states/supervisor.state';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	// supervisorState: ISupervisorState;
	seriesPlanDropdown: IDropDownState;
	locationDropdown: IDropDownState;
	supervisorLicenseDropdown: IDropDownState;
	roomDropdown: IDropDownState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	// supervisorState: supervisorReducers,
	seriesPlanDropdown: seriesPlanDropdownReducers,
	locationDropdown: locationDropdownReducers,
	roomDropdown: roomDropdownReducers,
	supervisorLicenseDropdown: supervisorLicenseDropdownReducers,
};
