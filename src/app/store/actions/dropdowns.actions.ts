import { createAction, props } from '@ngrx/store';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';

export const DropdownActions = {
	GetSeriesPlansPending: createAction('[Dropdown] Get series plans pending'),
	GetSeriesPlansSuccess: createAction(
		'[Dropdown] Get series plans success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSeriesPlansError: createAction('[Dropdown] Get series plans error'),

	GetSupervisorLicensePending: createAction('[Dropdown] Get supervisor-license pending'),
	GetSupervisorLicenseSuccess: createAction(
		'[Dropdown] Get supervisor-license success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSupervisorLicenseError: createAction('[Dropdown] Get supervisor-license error'),

	GetSupervisorLicensePayersPending: createAction(
		'[Dropdown] Get supervisor-license-payers pending',
	),
	GetSupervisorLicensePayersSuccess: createAction(
		'[Dropdown] Get supervisor-license-payers success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSupervisorLicensePayersError: createAction('[Dropdown] Get supervisor-license-payers error'),
};
