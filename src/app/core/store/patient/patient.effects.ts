import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { IAppState } from '../state/app.state';
import { PatientActions } from './patient.actions';

@Injectable()
export class PatientEffects {
	updatePatient$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PatientActions.UpdatePatient),
			switchMap((payload) =>
				this.gridService.updateModel(payload).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							return PatientActions.UpdatePatientComplete();
						}
						return PatientActions.UpdatePatientFail({ errors: result.error });
					}),
				),
			),
		),
	);

	getPersonLinks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PatientActions.GetPrivatePersonLinks),
			switchMap((payload) =>
				this.gridService.getPrivatePersonLinks(payload.patientId).pipe(
					map((response) => {
						return PatientActions.GetPrivatePersonLinksSuccess({
							patientId: payload.patientId,
							data: response,
						});
					}),
					catchError(() => EMPTY),
				),
			),
		),
	);

	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private gridService: PatientGridService,
	) {}
}
