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
	GetLanguagesPending: createAction('[Dropdown] Get languages pending'),
	GetLanguagesSuccess: createAction(
		'[Dropdown] Get languages success',
		props<{ data: IDropdownData[] }>(),
	),
	GetLanguagesError: createAction('[Dropdown] Get languages error'),

	GetLocationsPending: createAction('[Dropdown] Get locations pending'),
	GetLocationsSuccess: createAction(
		'[Dropdown] Get locations success',
		props<{ data: IDropdownData[] }>(),
	),
	GetLocationsError: createAction('[Dropdown] Get clinicians error'),

	GetCliniciansPending: createAction('[Dropdown] Get clinicians pending'),
	GetCliniciansSuccess: createAction(
		'[Dropdown] Get locations success',
		props<{ data: IDropdownData[] }>(),
	),
	GetCliniciansError: createAction('[Dropdown] Get clinicians error'),

	GetModalitiesPending: createAction('[Dropdown] Get modalities pending'),
	GetModalitiesSuccess: createAction(
		'[Dropdown] Get modalities success',
		props<{ data: IDropdownData[] }>(),
	),
	GetModalitiesError: createAction('[Dropdown] Get modalities error'),
	GetSnipiTypePending: createAction('[Dropdown] Get snipi type pending'),
	GetSnipiTypeSuccess: createAction(
		'[Dropdown] Get snipi type success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSnipiTypeError: createAction('[Dropdown] Get snipi type error'),
	GetSnipiCategoryPending: createAction('[Dropdown] Get snipi category pending'),
	GetSnipiCategorySuccess: createAction(
		'[Dropdown] Get snipi category success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSnipiCategoryError: createAction('[Dropdown] Get snipi category error'),
	GetLegendsPending: createAction('[Dropdown] Get legends pending'),
	GetLegendsSuccess: createAction(
		'[Dropdown] Get legends success',
		props<{ data: IDropdownData[] }>(),
	),
	GetLegendsError: createAction('[Dropdown] Get legends error'),
	GetAreasPending: createAction('[Dropdown] Get areas pending'),
	GetAreasSuccess: createAction('[Dropdown] Get areas success', props<{ data: IDropdownData[] }>()),
	GetAreasError: createAction('[Dropdown] Get areas error'),
	GetServiceSubTypesPending: createAction('[Dropdown] Get ServiceSubTypes pending'),
	GetServiceSubTypesSuccess: createAction(
		'[Dropdown] Get ServiceSubType success',
		props<{ data: IDropdownData[] }>(),
	),
	GetServiceSubTypesError: createAction('[Dropdown] Get ServiceSubTypes error'),
};
