import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { ClinicianGridService } from 'src/app/core/services/clinician.service';
import { IAppState } from '../state/app.state';
import { ClinicianActions } from './clinician.actions';

@Injectable()
export class ClinicianEffects {
	getClinicianModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ClinicianActions.GetClinicianModel),
			mergeMap(({ id }) =>
				this.gridService.getModel(id).pipe(
					map((payload) => ClinicianActions.GetClinicianModelSuccess({ clinician: payload })),
					catchError(() => of(ClinicianActions.GetClinicianModelFail())),
				),
			),
		),
	);

	newClinicianModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ClinicianActions.NewClinicianModel),
			mergeMap(() =>
				this.gridService.newClinicianModel().pipe(
					map((payload) => ClinicianActions.GetClinicianModelSuccess({ clinician: payload })),
					catchError(() => of(ClinicianActions.GetClinicianModelFail())),
				),
			),
		),
	);

	updateClinician$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ClinicianActions.UpdateClinician),
			switchMap((payload) =>
				this.gridService.updateModel(payload).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							return ClinicianActions.UpdateClinicianComplete();
						}
						return ClinicianActions.UpdateClinicianFail({ errors: result.error });
					}),
				),
			),
		),
	);

	createClinician$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ClinicianActions.CreateClinician),
			switchMap((payload) =>
				this.gridService.createModel(payload.clinician).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							return ClinicianActions.CreateClinicianComplete({ id: result.id });
						}
						return ClinicianActions.UpdateClinicianFail({ errors: result.error });
					}),
				),
			),
		),
	);

	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private gridService: ClinicianGridService,
	) {}
}
