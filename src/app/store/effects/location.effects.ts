import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/interfaces/location.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { LocationActions } from '../actions/location.actions';

@Injectable()
export class LocationEffects {
	public constructor(private actions$: Actions, private service: LocationService) {}

	public getLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocationActions.GetSelectedLocationPending),
			mergeMap(({ id }: { id: string }) =>
				this.service.getLocation(id).pipe(
					map((selectedLocation: ILocation) => {
						return LocationActions.GetSelectedLocationSuccess({ selectedLocation });
					}),
					catchError(() => of(LocationActions.GetSelectedLocationError())),
				),
			),
		),
	);
}
