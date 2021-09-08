import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/store';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { PatientDetailsActions } from './store/actions/patient-details.actions';

@Component({
	providers: [],
	selector: 'advenium-patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent extends UnSubscriber implements OnInit {
	public constructor(
		private store: Store<IStore>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {
		super();
	}

	public personId$: Observable<string> = this.store
		.select('patient' as any, 'current', 'person', 'id')
		.pipe(takeUntil(this.unsubscribe$$));

	public currentFragment!: string;

	public tabs: string[] = ['General', 'Demographic', 'Contacts', 'Insurance'];

	public patientId: string = this.activatedRoute.snapshot.params.id;

	public ngOnInit(): void {
		this.store.dispatch(
			PatientDetailsActions.GetPatientDetailsPending({
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
