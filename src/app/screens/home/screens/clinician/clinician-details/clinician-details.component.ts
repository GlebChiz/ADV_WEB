import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { IStore } from 'src/app/store';
import { ClinicanDetailsActions } from './store/actions/clinician-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './clinician-details.component.html',
})
export class ClinicianDetailsComponent extends UnSubscriber implements OnInit {
	public constructor(
		private store: Store<IStore>,
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {
		super();
	}

	public currentFragment!: string;

	public tabs: string[] = ['General', 'Demographic', 'Contacts'];

	public personId$: Observable<string> = this.store
		.select('clinicianCurrent' as any, 'current', 'person', 'id')
		.pipe(takeUntil(this.unsubscribe$$));

	public clinicianId: string = this.activatedRoute.snapshot.params.id;

	public ngOnInit(): void {
		this.store.dispatch(
			ClinicanDetailsActions.GetClinicanDetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);

		this.activatedRoute.fragment.subscribe((fragment: any) => {
			this.currentFragment = fragment;
		});

		if (this.tabs[0] && !this.currentFragment) {
			this.router.navigate([], {
				fragment: this.tabs[0].toLowerCase(),
			});
		}
	}

	public onTabSelect(e: SelectEvent): void {
		this.router.navigate([], {
			fragment: e.title.toLowerCase(),
		});
	}
}
