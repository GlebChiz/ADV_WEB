import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { IColumnFilter } from 'src/app/core/models/filters/column-filter.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-grid-value-filter',
	templateUrl: './value-filter.component.html',
})
export class GridValueFilterComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	_filter: IColumnFilter | null = null;

	@Input() set filter(value: IColumnFilter) {
		this._filter = value;
		this.initForm(value);
	}

	get filter(): IColumnFilter {
		return this._filter!;
	}

	@Input() gridId!: string;

	@Input() filterId!: string;

	form!: FormGroup;

	// private _destroy$ = new Subject();

	model$: Observable<any> | null = null;

	constructor(public _store: Store<IAppState>) {
		super();
	}

	ngOnInit(): void {
		this.initForm(this.filter);
	}

	initForm(filter: IColumnFilter): void {
		if (filter != null) {
			if (this.form) {
				this.form.setValue({ value: filter.data || '' });
			} else {
				this.form = new FormGroup({
					value: new FormControl(filter.data || ''),
				});

				this.form.valueChanges.subscribe(() => {
					this.submitForm();
				});
			}
		}
	}

	submitForm() {
		this._store.dispatch(
			GridActions.SetColumnFilterValue({
				gridId: this.gridId,
				name: this.filter.column,
				data: this.form.value.value || '',
			}),
		);
	}

	onKeyDown(pressedKey: any) {
		if (pressedKey.key === 'Enter') {
			this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
		}
	}
}
