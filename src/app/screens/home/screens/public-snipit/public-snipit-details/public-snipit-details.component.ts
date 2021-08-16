import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PublicSnipitDetailsActions } from './store/actions/public-snipit-details.actions';

@Component({
	providers: [],
	selector: 'advenium-public-snipit-details',
	templateUrl: './public-snipit-details.component.html',
})
export class PublicSnipitDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public publicSnipitDetails$: Observable<any> = this.store.select('public-snipit');

	public ngOnInit(): void {
		this.store.dispatch(
			PublicSnipitDetailsActions.GetPublicSnipitDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
