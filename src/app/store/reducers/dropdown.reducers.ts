import { Action, createReducer, on } from '@ngrx/store';
import { IDropDownState, IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from '../actions/dropdowns.actions';

const initialDropdownState: IDropDownState = { data: [], isLoading: false };

export function dropdownReducers(
	dropdownState: IDropDownState | undefined,
	action: Action,
): IDropDownState {
	return createReducer(
		initialDropdownState,
		on(
			DropdownActions.GetRoomSizeSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, roomSize: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetAreasSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, areas: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetServiceSubTypesSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, serviceSubTypes: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetCliniciansSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, clinicians: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetRoomSetupSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, roomSetup: data, isLoading: false };
			},
		),

		on(
			DropdownActions.GetLanguagesSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, languages: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetLocationsSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, locations: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetLocationInitiativeIdsSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, locationInitiativeIds: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetModalitiesSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, modalities: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetSnipiTypeSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, snipitTypes: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetSeriesPlansSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, seriesPlans: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetSupervisorLicensePayersSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, supervisorLicensePayers: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetSupervisorLicenseSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, supervisorLicense: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetSnipiCategorySuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, snipiCategory: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetLegendsSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, legends: data, isLoading: false };
			},
		),
	)(dropdownState, action);
}
