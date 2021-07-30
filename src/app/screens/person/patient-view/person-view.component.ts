import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPerson } from 'src/app/core/models/person.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectPersonModel } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-person-view',
	templateUrl: './person-view.component.html',
})
export class PersonViewComponent implements OnDestroy {
	private _destroy$ = new Subject();

	personModel$: Observable<IPerson> | null = null;

	fragment = '';

	constructor(private route: ActivatedRoute, private _store: Store<IAppState>) {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			this.fragment = xFragment || '';
			const personId = xParams.id;
			this._store.dispatch(PersonActions.GetPersonModel({ id: personId }));
			this.personModel$ = this._store.pipe(
				select(selectPersonModel, { personId }),
				takeUntil(this._destroy$),
			);
			this.personModel$.subscribe((x) => {
				if (x != null) {
					this._store.dispatch(
						PageSettingsActions.SetTitle({ settings: { title: `${x.lastname}, ${x.firstname}` } }),
					);
				}
			});
		});
	}

	// ngOnInit(): void {}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	closeEditor(): void {}

	reloadData(): void {}
}
