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

	public getTypes$ = createEffect(() =>
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
}
