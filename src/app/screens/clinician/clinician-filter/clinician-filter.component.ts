import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { selectFilterData, selectFilterStatus } from 'src/app/core/store/filter/filter.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-clinician-filter',
	templateUrl: './clinician-filter.component.html',
})
export class ClinicianFilterComponent implements OnInit, OnDestroy {
	public filterForm!: FormGroup;

	@Input() public filterId!: string;

	public show = false;

	public status$: any;

	private _destroy$ = new Subject();

	public constructor(
		private _fb: FormBuilder,
		// private _dropDownService: DropDownService,
		private _store: Store<IAppState>,
	) {}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public ngOnInit(): void {
		this.status$ = this._store.pipe(
			select(selectFilterStatus, this.filterId),
			takeUntil(this._destroy$),
		);
		this.status$.subscribe((status: boolean) => {
			if (this.show === false && status === true) {
				this.show = true;
				this._store
					.pipe(select(selectFilterData, this.filterId))
					.pipe(take(1))
					.subscribe((x) => {
						this.initForm(x);
					});
			} else if (status === false) {
				this.show = false;
			}
		});
	}

	public initForm(value: any) {
		if (!this.filterForm) {
			this.filterForm = this._fb.group({
				search: this._fb.control(null),
			});
		}
		this.filterForm.setValue(value);
	}

	public onKeyDown(pressedKey: KeyboardEvent) {
		if (pressedKey.key === 'Enter') {
			this.filter();
		}
	}

	public filter(): void {
		this._store.dispatch(
			FilterActions.SetFilter({ id: this.filterId, filter: this.filterForm.value }),
		);
	}

	public close(): void {
		this._store.dispatch(FilterActions.CloseFilter({ id: this.filterId }));
	}

	public reset(): void {
		/* if (!confirm('Are you sure you want to reset Filters?')) {
        return;
      } */

		this.filterForm.reset();
		this.filter();
	}
}
