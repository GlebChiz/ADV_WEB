import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { seriesPlanDropdownReducers } from './reducers/series-plan.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { languagesReducers } from './reducers/languages.reducers';
import { modalitiesDropdownReducers } from './reducers/modalities.reducers';
import { ILocationState } from '../shared/interfaces/location.interface';
import { locationReducers } from './reducers/location.reducers';
import { locationDropdownReducers } from './reducers/location-initiative-ids.reducers';
import { roomDropdownReducers } from './reducers/room.reducers';
import { supervisorLicenseDropdownReducers } from './reducers/supervisor-license.reducers';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	seriesPlanDropdown: IDropDownState;
	locationDropdown: IDropDownState;
	supervisorLicenseDropdown: IDropDownState;
	roomDropdown: IDropDownState;
	languages: IDropDownState;
	modalities: IDropDownState;
	location: ILocationState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	seriesPlanDropdown: seriesPlanDropdownReducers,
	locationDropdown: locationDropdownReducers,
	roomDropdown: roomDropdownReducers,
	supervisorLicenseDropdown: supervisorLicenseDropdownReducers,
	languages: languagesReducers,
	modalities: modalitiesDropdownReducers,
	location: locationReducers,
};
