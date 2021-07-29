import { ICallState, initialCallState } from '../call/call.state';
import { IChecklistState, initialChecklistState } from '../checklist/checklist.state';
import { IClinicianState, initialClinicianState } from '../clinician/clinician.state';
import { ICRMSearchState, initialCRMSearchState } from '../crmsearch/crmsearch.state';
import { IFilterState, initialFilterState } from '../filter/filter.state';
import { IGridState, initialGridState } from '../grid/grid.state';
import { IPatientState, initialPatientState } from '../patient/patient.state';
import { initialPersonState, IPersonState } from '../person/person.state';
import { initialServiceState, IServiceState } from '../service/service.state';
import { initialUserState, IUserState } from '../user/user.state';
import { initialPageSettings, IPageSettingsState } from './page-settings/page-settings.state';

export interface IAppState {
	userState: IUserState;
	pageSettingsState: IPageSettingsState;
	patientState: IPatientState;
	gridState: IGridState;
	filterState: IFilterState;
	personState: IPersonState;
	callState: ICallState;
	checklistState: IChecklistState;
	clinicianState: IClinicianState;
	serviceState: IServiceState;
	crmSearchState: ICRMSearchState;
}

export const initialAppState: IAppState = {
	userState: initialUserState,
	pageSettingsState: initialPageSettings,
	patientState: initialPatientState,
	gridState: initialGridState,
	filterState: initialFilterState,
	personState: initialPersonState,
	callState: initialCallState,
	checklistState: initialChecklistState,
	clinicianState: initialClinicianState,
	serviceState: initialServiceState,
	crmSearchState: initialCRMSearchState,
};

export function getInitialState(): IAppState {
	return initialAppState;
}
