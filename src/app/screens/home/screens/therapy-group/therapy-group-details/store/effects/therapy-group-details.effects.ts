import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TherapyGroupDetailsService } from '../../services/therapy-group-details.service';
import { TherapyGroupDetailsActions } from '../actions/therapy-group-details.actions';

@Injectable()
export class TherapyGroupDetailsEffects {
	public constructor(private actions$: Actions, private service: TherapyGroupDetailsService) {}

	public getTherapyGroupDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TherapyGroupDetailsActions.GetTherapyGroupDetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getTherapyGroupDetails(id).pipe(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					map((current: any) =>
						TherapyGroupDetailsActions.GetTherapyGroupDetailsSuccess({ current }),
					),
					catchError(() => of(TherapyGroupDetailsActions.GetTherapyGroupDetailsError())),
				),
			),
		),
	);
}
