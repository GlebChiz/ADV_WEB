import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { PatientActions } from './patient.actions';

@Injectable()
export class PatientEffects {
	constructor(private actions$: Actions, private gridService: PatientGridService) {}

	updatePatient$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PatientActions.UpdatePatient),
			switchMap((payload) => {
				return this.gridService.updateModel(payload).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							return PatientActions.UpdatePatientComplete();
						}
						return PatientActions.UpdatePatientFail({ errors: result.error });
					}),
				);
			}),
		);
	});

	getPersonLinks$ = createEffect(() => {
		return this.actions$.pipe(
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
		);
	});
}
