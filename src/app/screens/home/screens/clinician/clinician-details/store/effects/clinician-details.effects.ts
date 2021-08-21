import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ClinicianDetailsService } from '../../services/clinican-details.service';
import { ClinicanDetailsActions } from '../actions/clinician-details.actions';

@Injectable()
export class ClinicianDetailsEffects {
	public constructor(private actions$: Actions, private service: ClinicianDetailsService) {}

	public getClinicanDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ClinicanDetailsActions.GetClinicanDetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getPatientDetails(id).pipe(
					map((current: any) => ClinicanDetailsActions.GetClinicanDetailsSuccess({ current })),
					catchError(() => of(ClinicanDetailsActions.GetClinicanDetailsError())),
				),
			),
		),
	);
}
