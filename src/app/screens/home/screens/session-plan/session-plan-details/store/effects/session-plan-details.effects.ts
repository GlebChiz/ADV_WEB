import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SessionPlanDetailsService } from '../../services/session-plan-details.service';
import { SessionPlanDetailsActions } from '../actions/session-plan-details.actions';

@Injectable()
export class SessionPlanDetailsEffects {
	public constructor(private actions$: Actions, private service: SessionPlanDetailsService) {}

	public getSessionPlanDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SessionPlanDetailsActions.GetSessionPlanDetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getSessionPlanDetails(id).pipe(
					map((current: any) =>
						SessionPlanDetailsActions.GetSessionPlanDetailsSuccess({ current }),
					),
					catchError(() => of(SessionPlanDetailsActions.GetSessionPlanDetailsError())),
				),
			),
		),
	);
}
