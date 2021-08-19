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
	GetLocationInitiativeIdsPending: createAction('[Dropdown] Get location initiative ids pending'),
	GetLocationInitiativeIdsSuccess: createAction(
		'[Dropdown] Get location initiative ids success',
		props<{ data: IDropdownData[] }>(),
	),
	GetLocationInitiativeIdsError: createAction('[Dropdown] Get location initiative ids error'),
	GetRoomSizePending: createAction('[Dropdown] Get room size pending'),
	GetRoomSizeSuccess: createAction(
		'[Dropdown] Get room size success',
		props<{ data: IDropdownData[] }>(),
	),
	GetRoomSizeError: createAction('[Dropdown] Get room size error'),
	GetRoomSetupPending: createAction('[Dropdown] Get room setup pending'),
	GetRoomSetupSuccess: createAction(
		'[Dropdown] Get room setup success',
		props<{ data: IDropdownData[] }>(),
	),
	GetRoomSetupError: createAction('[Dropdown] Get room setup error'),
};
