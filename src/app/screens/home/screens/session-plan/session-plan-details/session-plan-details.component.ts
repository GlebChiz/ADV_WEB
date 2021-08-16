import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SessionPlanDetailsActions } from './store/actions/session-plan-details.actions';

@Component({
	providers: [],
	selector: 'advenium-session-plan-details',
	templateUrl: './session-plan-details.component.html',
})
export class SessionPlanDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public sessionPlanDetails$: Observable<any> = this.store.select('sessionplans');

	public ngOnInit(): void {
		this.store.dispatch(
			SessionPlanDetailsActions.GetSessionPlanDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
