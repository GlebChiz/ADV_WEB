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
						console.log(data);

						return DropdownActions.GetPatientsSuccess({ data });
					}),
					catchError(() => of(DropdownActions.GetPatientsError())),
				),
			),
		),
	);
}
