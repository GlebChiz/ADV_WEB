import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { selectFilterData, selectFilterStatus } from 'src/app/core/store/filter/filter.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-payer-filter',
	templateUrl: './payer-filter.component.html',
})
export class PayerFilterComponent implements OnInit {
	filterForm!: FormGroup;

	show = false;

	status$: any;

	private _destroy$ = new Subject();

	@Input() filterId!: string;

	constructor(private _fb: FormBuilder, private _store: Store<IAppState>) {}

	open() {}

	ngOnInit(): void {
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

	initForm(value: any) {
		if (!this.filterForm) {
			this.filterForm = this._fb.group({
				search: this._fb.control(null),
			});
		}
		this.filterForm.setValue(value);
	}

	onKeyDown(pressedKey) {
		if (pressedKey.key === 'Enter') {
			this.filter();
		}
	}

	filter(): void {
		this._store.dispatch(
			FilterActions.SetFilter({ id: this.filterId, filter: this.filterForm.value }),
		);
	}

	close(): void {
		this._store.dispatch(FilterActions.CloseFilter({ id: this.filterId }));
	}

	reset(): void {
		/* if (!confirm('Are you sure you want to reset Filters?')) {
        return;
      } */

		this.filterForm.reset();
		this.filter();
	}
}
