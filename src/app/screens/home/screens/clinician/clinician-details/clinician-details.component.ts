import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ClinicanDetailsActions } from './store/actions/clinician-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './clinician-details.component.html',
})
export class ClinicianDetailsComponent extends UnSubscriber implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {
		super();
	}

	public personId$: Observable<string> = this.store
		.select('clinician', 'current', 'person', 'id')
		.pipe(takeUntil(this.unsubscribe$$));

	public ngOnInit(): void {
		this.store.dispatch(
			ClinicanDetailsActions.GetClinicanDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
