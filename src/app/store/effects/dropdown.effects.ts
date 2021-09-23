import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DropdownActions } from '../actions/dropdowns.actions';

@Injectable()
export class DropdownEffects {
	public constructor(private actions$: Actions, private service: DropdownService) {}

	public getSeriesPlan$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSeriesPlansPending),
			switchMap(() =>
				this.service.getSeriesPlans().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSeriesPlansSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSeriesPlansError())),
				),
			),
		),
	);

	public getSupervisor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSupervisorLicensePending),
			switchMap(() =>
				this.service.getSupervisorLicense().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSupervisorLicenseSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSupervisorLicenseError())),
				),
			),
		),
	);

	public getLocationInitiatives$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetLocationInitiativeIdsPending),
			switchMap(() =>
				this.service.getLocationInitiatives().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetLocationInitiativeIdsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetLocationInitiativeIdsError())),
				),
			),
		),
	);

	public getLocations$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetLocationsPending),
			switchMap(() =>
				this.service.getLocations().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetLocationsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetLocationsError())),
				),
			),
		),
	);

	public getClinicians$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetCliniciansPending),
			switchMap(() =>
				this.service.getClinicians().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetCliniciansSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetCliniciansError())),
				),
			),
		),
	);

	public getLegends$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetLegendsPending),
			switchMap(() =>
				this.service.getLegends().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetLegendsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetLegendsError())),
				),
			),
		),
	);

	public getSupervisorPayers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSupervisorLicensePayersPending),
			switchMap(() =>
				this.service.getSupervisorLicensePayers().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSupervisorLicensePayersSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSupervisorLicensePayersError())),
				),
			),
		),
	);

	public getLanguages$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetLanguagesPending),
			switchMap(() =>
				this.service.getSupervisorLanguages().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetLanguagesSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetLanguagesError())),
				),
			),
		),
	);

	public getAreas$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetAreasPending),
			switchMap(() =>
				this.service.getAreas().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetAreasSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetAreasError())),
				),
			),
		),
	);

	public getServiceSubTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetServiceSubTypesPending),
			switchMap(() =>
				this.service.getServiceSubTypes().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetServiceSubTypesSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetServiceSubTypesError())),
				),
			),
		),
	);

	public getModalities$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetModalitiesPending),
			switchMap(() =>
				this.service.getModalities().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetModalitiesSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetModalitiesError())),
				),
			),
		),
	);

	public getRoomSize$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetRoomSizePending),
			switchMap(() =>
				this.service.getRoomSize().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetRoomSizeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetRoomSizeError())),
				),
			),
		),
	);

	public getRoomSetup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetRoomSetupPending),
			switchMap(() =>
				this.service.getRoomSetup().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetRoomSetupSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetRoomSetupError())),
				),
			),
		),
	);

	public getSnipitTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSnipiTypePending),
			switchMap(() =>
				this.service.getSnipitTypes().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSnipiTypeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSnipiTypeError())),
				),
			),
		),
	);

	public getSnipitCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSnipiCategoryPending),
			switchMap(() =>
				this.service.getSnipitCategory().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSnipiCategorySuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSnipiCategoryError())),
				),
			),
		),
	);

	public getPatients$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetPatientsPending),
			switchMap(() =>
				this.service.getPatients().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetPatientsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPatientsError())),
				),
			),
		),
	);

	public getRooms$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetRoomsPending),
			switchMap(() =>
				this.service.getRooms().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetRoomsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetRoomsError())),
				),
			),
		),
	);

	public getSex$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSexPending),
			switchMap(() =>
				this.service.getSex().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSexSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSexError())),
				),
			),
		),
	);

	public getGender$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetGenderPending),
			switchMap(() =>
				this.service.getGender().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetGenderSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetGenderError())),
				),
			),
		),
	);

	public getRace$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetRacePending),
			switchMap(() =>
				this.service.getRace().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetRaceSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetRaceError())),
				),
			),
		),
	);

	public getSexOrientation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSexOrientationPending),
			switchMap(() =>
				this.service.getSexOrientation().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSexOrientationSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSexOrientationError())),
				),
			),
		),
	);

	public getUsState$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetUsStatePending),
			switchMap(() =>
				this.service.getUsState().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetUsStateSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetUsStateError())),
				),
			),
		),
	);

	public getMaritalStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetMaritalStatusPending),
			switchMap(() =>
				this.service.getMaritalStatus().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetMaritalStatusSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetMaritalStatusError())),
				),
			),
		),
	);

	public getEmployement$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetEmployementPending),
			switchMap(() =>
				this.service.getEmployement().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetEmployementSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetEmployementError())),
				),
			),
		),
	);

	public getPreferredContact$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetPreferredContactPending),
			switchMap(() =>
				this.service.getPreferredContact().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetPreferredContactSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPreferredContactError())),
				),
			),
		),
	);

	public getPhoneType$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetPhoneTypePending),
			switchMap(() =>
				this.service.getPhoneType().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetPhoneTypeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPhoneTypeError())),
				),
			),
		),
	);

	public getPatientStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetPatientStatusPending),
			switchMap(() =>
				this.service.getPatientStatus().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetPatientStatusSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPatientStatusError())),
				),
			),
		),
	);

	public getClinicianType$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetClinicianTypePending),
			switchMap(() =>
				this.service.getClinicianType().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetClinicianTypeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetClinicianTypeError())),
				),
			),
		),
	);

	public getCriteriasType$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetCriteriasTypePending),
			switchMap(({ questionId }: { questionId: string }) =>
				this.service.getCriteriasType(questionId).pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetCriteriasTypeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetCriteriasTypeError())),
				),
			),
		),
	);

	public getResponseOption$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetResponseOptionPending),
			switchMap(() =>
				this.service.getResponseOption().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetResponseOptionSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetResponseOptionError())),
				),
			),
		),
	);

	public getLinkedPersons$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetLinkedPersonsPending),
			switchMap(({ personId }: { personId: string }) =>
				this.service.getLinkedPersons(personId).pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetLinkedPersonsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetLinkedPersonsError())),
				),
			),
		),
	);

	public getAutoNotePrefills$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetAutoNotePrefillsPending),
			switchMap(() =>
				this.service.getAutoNotePrefills().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetAutoNotePrefillsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetAutoNotePrefillsError())),
				),
			),
		),
	);

	public getGridSettings$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetGridSettingsPending),
			switchMap(({ gridId }: { gridId: string }) =>
				this.service.getGridSettings(gridId).pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetGridSettingsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetGridSettingsError())),
				),
			),
		),
	);

	public getRolesTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetGridSettingsPending),
			switchMap(({ gridId }: { gridId: string }) =>
				this.service.getGridSettings(gridId).pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetGridSettingsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetGridSettingsError())),
				),
			),
		),
	);

	public getRoleTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetRoleTypesPending),
			switchMap(() =>
				this.service.getRolesTypes().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetRoleTypesSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetRoleTypesError())),
				),
			),
		),
	);

	public getPermissionTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetPermissionTypesPending),
			switchMap(() =>
				this.service.getPermissionTypes().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetPermissionTypesSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPermissionTypesError())),
				),
			),
		),
	);
}
