import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PublicSnipitDetailsService } from '../../services/public-snipit-details.service';
import { PublicSnipitDetailsActions } from '../actions/public-snipit-details.actions';

@Injectable()
export class PublicSnipitDetailsEffects {
	public constructor(private actions$: Actions, private service: PublicSnipitDetailsService) {}

	public getPublicSnipitDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PublicSnipitDetailsActions.GetPublicSnipitDetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getPublicSnipitDetails(id).pipe(
					map((current: any) =>
						PublicSnipitDetailsActions.GetPublicSnipitDetailsSuccess({ current }),
					),
					catchError(() => of(PublicSnipitDetailsActions.GetPublicSnipitDetailsError())),
				),
			),
		),
	);
}
