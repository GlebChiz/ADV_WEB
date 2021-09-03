import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { LocationService } from 'src/app/shared/services/location.service';
import { LocationActions } from '../actions/location.actions';

@Injectable()
export class LocationEffects {
	public constructor(private actions$: Actions, private service: LocationService) {}

	public getLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocationActions.GetSelectedLocationPending),
			mergeMap(({ id }) =>
				this.service.getLocation(id).pipe(
					map((selectedLocation: any) => {
						return LocationActions.GetSelectedLocationSuccess({ selectedLocation });
					}),
					catchError(() => of(LocationActions.GetSelectedLocationError())),
				),
			),
		),
	);
}
