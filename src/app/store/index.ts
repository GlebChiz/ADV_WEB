import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { seriesPlanDropdownReducers } from './reducers/series-plan.reducers';
import { userReducers } from './reducers/user.reducers';
import { IPayerState } from './states/payer.state';
import { IUserState } from './states/user.state';
import { IDropDownState } from '../shared/interfaces/dropdown.interface';
import { supervisorLicenseDropdownReducers } from './reducers/supervisor-license.reducers';
import { supervisorLicensePayersDropdownReducers } from './reducers/supervisor-license-payers.reducers';
import { locationDropdownReducers } from './reducers/location-initiative-ids.reducers';
import { roomDropdownReducers } from './reducers/room.reducers';
import { languagesReducers } from './reducers/languages.reducers';
import { modalitiesDropdownReducers } from './reducers/modalities.reducers';
import { ILocationState } from '../shared/interfaces/location.interface';
import { locationReducers } from './reducers/location.reducers';
import { publicSnipitDropdownReducers } from './reducers/public-snipit.reducers';
import { dropdownReducers } from './reducers/dropdown.reducers';

export interface IStore {
	userState: IUserState;
	payerState: IPayerState;
	seriesPlanDropdown: IDropDownState;
	supervisorDropdown: IDropDownState;
	payerDropdown: IDropDownState;
	locationDropdown: IDropDownState;
	roomDropdown: IDropDownState;
	languages: IDropDownState;
	modalities: IDropDownState;
	location: ILocationState;
	publicSnipitDropdown: IDropDownState;
	dropdown: IDropDownState;
}

export const appReducers: ActionReducerMap<IStore> = {
	userState: userReducers,
	payerState: payerReducers,
	seriesPlanDropdown: seriesPlanDropdownReducers,
	supervisorDropdown: supervisorLicenseDropdownReducers,
	payerDropdown: supervisorLicensePayersDropdownReducers,
	locationDropdown: locationDropdownReducers,
	roomDropdown: roomDropdownReducers,
	languages: languagesReducers,
	modalities: modalitiesDropdownReducers,
	location: locationReducers,
	publicSnipitDropdown: publicSnipitDropdownReducers,
	dropdown: dropdownReducers,
};
