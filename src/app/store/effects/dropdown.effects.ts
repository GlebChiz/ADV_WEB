import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DropdownActions } from '../actions/dropdowns.actions';

@Injectable()
export class DropdownEffects {
	public constructor(private actions$: Actions, private service: DropdownService) {}

	public getSeriesPlan$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetSeriesPlansPending),
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
				this.service.getSexOrientation().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetSexOrientationSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetSexOrientationError())),
				),
			),
		),
	);

	public getCityState$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetCityStatePending),
			mergeMap(() =>
				this.service.getCityState().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetCityStateSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetCityStateError())),
				),
			),
		),
	);

	public getMaritalStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DropdownActions.GetMaritalStatusPending),
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
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
			mergeMap(() =>
				this.service.getClinicianType().pipe(
					map((data: IDropdownData[]) => {
						return DropdownActions.GetClinicianTypeSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetClinicianTypeError())),
				),
			),
		),
	);
}
