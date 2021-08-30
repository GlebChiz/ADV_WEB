/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { TherapyGroupDetailsActions } from './store/actions/therapy-group-details.actions';

@Component({
	providers: [],
	selector: 'advenium-therapy-group-details',
	templateUrl: './therapy-group-details.component.html',
})
export class TherapyGroupDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public therapyGroupDetails$: Observable<any> = this.store.select('therapygroup');

	public ngOnInit(): void {
		this.store.dispatch(
			TherapyGroupDetailsActions.GetTherapyGroupDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
