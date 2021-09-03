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
	GetPatientsPending: createAction('[Dropdown] Get Patients pending'),
	GetPatientsSuccess: createAction(
		'[Dropdown] Get Patients success',
		props<{ data: IDropdownData[] }>(),
	),
	GetPatientsError: createAction('[Dropdown] Get Patients error'),
	GetRoomsPending: createAction('[Dropdown] Get Rooms pending'),
	GetRoomsSuccess: createAction('[Dropdown] Get Rooms success', props<{ data: IDropdownData[] }>()),
	GetRoomsError: createAction('[Dropdown] Get Rooms error'),
	GetSexPending: createAction('[Dropdown] Get Sex pending'),
	GetSexSuccess: createAction('[Dropdown] Get Sex success', props<{ data: IDropdownData[] }>()),
	GetSexError: createAction('[Dropdown] Get Sex error'),

	GetGenderPending: createAction('[Dropdown] Get Gender pending'),
	GetGenderSuccess: createAction(
		'[Dropdown] Get Gender success',
		props<{ data: IDropdownData[] }>(),
	),
	GetGenderError: createAction('[Dropdown] Get Gender error'),

	GetSexOrientationPending: createAction('[Dropdown] Get SexOrientation pending'),
	GetSexOrientationSuccess: createAction(
		'[Dropdown] Get SexOrientation success',
		props<{ data: IDropdownData[] }>(),
	),
	GetSexOrientationError: createAction('[Dropdown] Get SexOrientation error'),

	GetCityStatePending: createAction('[Dropdown] Get CityState pending'),
	GetCityStateSuccess: createAction(
		'[Dropdown] Get CityState success',
		props<{ data: IDropdownData[] }>(),
	),
	GetCityStateError: createAction('[Dropdown] Get CityState error'),

	GetRacePending: createAction('[Dropdown] Get Race pending'),
	GetRaceSuccess: createAction('[Dropdown] Get Race success', props<{ data: IDropdownData[] }>()),
	GetRaceError: createAction('[Dropdown] Get Race error'),

	GetMaritalStatusPending: createAction('[Dropdown] Get MaritalStatus pending'),
	GetMaritalStatusSuccess: createAction(
		'[Dropdown] Get MaritalStatus success',
		props<{ data: IDropdownData[] }>(),
	),
	GetMaritalStatusError: createAction('[Dropdown] Get MaritalStatus error'),

	GetEmployementPending: createAction('[Dropdown] Get Employement pending'),
	GetEmployementSuccess: createAction(
		'[Dropdown] Get Employement success',
		props<{ data: IDropdownData[] }>(),
	),
	GetEmployementError: createAction('[Dropdown] Get Employement error'),
	GetPreferredContactPending: createAction('[Dropdown] Get PreferredContact pending'),
	GetPreferredContactSuccess: createAction(
		'[Dropdown] Get PreferredContact success',
		props<{ data: IDropdownData[] }>(),
	),
	GetPreferredContactError: createAction('[Dropdown] Get PreferredContact error'),
	GetPhoneTypePending: createAction('[Dropdown] Get PhoneType pending'),
	GetPhoneTypeSuccess: createAction(
		'[Dropdown] Get PhoneType success',
		props<{ data: IDropdownData[] }>(),
	),
	GetPhoneTypeError: createAction('[Dropdown] Get PhoneType error'),
};
