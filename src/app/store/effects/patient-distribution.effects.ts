import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { PatientDistributionService } from 'src/app/shared/services/patient-distribution.service';
import { PatientDistributionActions } from '../actions/patient-distribution.actions';

@Injectable()
export class PatientDistributionEffects {
	public constructor(
		public _store: Store<any>,
		private actions$: Actions,
		private patientDistributionService: PatientDistributionService,
	) {}

	public updateFieldTherapyGroup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PatientDistributionActions.UpdateFiledPatientDistributionPending),
			mergeMap(
				({
					patientIds,
					supervisorId,
					startDate,
				}: {
					patientIds: string[];
					supervisorId: string;
					startDate: Date;
				}) =>
					this.patientDistributionService
						.updateFieldPatientDistribution(patientIds, supervisorId, startDate)
						.pipe(
							map(() => {
								return PatientDistributionActions.UpdateFiledPatientDistributionSuccess();
							}),
							catchError(() =>
								of(PatientDistributionActions.UpdateFiledPatientDistributionError()),
							),
						),
			),
		),
	);
}
