import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PatientDetailsService } from '../../services/patient-details.service';
import { PatientDetailsActions } from '../actions/patient-details.actions';

@Injectable()
export class PatientDetailsEffects {
	public constructor(private actions$: Actions, private service: PatientDetailsService) {}

	public getPatientDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PatientDetailsActions.GetPatientDetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getPatientDetails(id).pipe(
					map((current: any) => PatientDetailsActions.GetPatientDetailsSuccess({ current })),
					catchError(() => of(PatientDetailsActions.GetPatientDetailsError())),
				),
			),
		),
	);
}
