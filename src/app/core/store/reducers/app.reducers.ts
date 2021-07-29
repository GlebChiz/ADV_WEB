import { ActionReducerMap } from '@ngrx/store';
import { callReducers } from '../call/call.reducers';
import { checklistReducers } from '../checklist/checklist.reducers';
import { clinicianReducers } from '../clinician/clinician.reducers';
import { crmSearchReducers } from '../crmsearch/crmsearch.reducers';
import { filterReducers } from '../filter/filter.reducers';
import { gridReducers } from '../grid/grid.reducers';
import { patientReducers } from '../patient/patient.reducers';
import { personReducers } from '../person/person.reducers';
import { serviceReducers } from '../service/service.reducers';
import { IAppState } from '../state/app.state';
import { userReducers } from '../user/user.reducers';
import { pageSettingsReducers } from './page-settings/page-settings.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
	userState: userReducers,
	pageSettingsState: pageSettingsReducers,
	patientState: patientReducers,
	gridState: gridReducers,
	filterState: filterReducers,
	personState: personReducers,
	callState: callReducers,
	checklistState: checklistReducers,
	clinicianState: clinicianReducers,
	serviceState: serviceReducers,
	crmSearchState: crmSearchReducers,
};
