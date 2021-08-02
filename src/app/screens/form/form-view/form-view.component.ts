import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { IEditingForm } from 'src/app/core/models/form.model';
import { FormService } from 'src/app/core/services/form.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-form-view',
	templateUrl: './form-view.component.html',
})
export class FormViewComponent implements OnDestroy {
	private _destroy$ = new Subject();

	formModel!: IEditingForm;

	fragment = '';

	constructor(
		private route: ActivatedRoute,
		private _store: Store<IAppState>,
		private formService: FormService,
	) {
		combineLatest([this.route.params, this.route.fragment]).subscribe(([xParams, xFragment]) => {
			this.fragment = xFragment || '';
			const formId = xParams.id;
			this.formService.getForm(formId).subscribe((x) => {
				this.formModel = x;
				this._store.dispatch(
					PageSettingsActions.SetTitle({
						settings: {
							title: x.revision.title || x.revision.definition.title,
						},
					}),
				);
			});
		});
	}

	// ngOnInit(): void {}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	closeEditor(): void {}

	reloadData(): void {}
}
