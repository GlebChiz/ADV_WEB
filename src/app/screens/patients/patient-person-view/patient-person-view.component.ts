import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { PatientGridService } from 'src/app/core/services/patient.service';

@Component({
	providers: [],
	selector: 'advenium-patient-person-view',
	templateUrl: './patient-person-view.component.html',
})
export class PatientPersonViewComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	constructor(
		private route: ActivatedRoute,
		private gridService: PatientGridService,
		private router: Router,
	) {}

	ngOnInit(): void {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			const fragment = xFragment || '';
			const personId = xParams.id;

			this.gridService.getModelByPerson(personId).subscribe((x) => {
				if (x != null) {
					this.router.navigate(['/patient', x.id], { fragment } as NavigationExtras);
				}
			});
		});
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}
