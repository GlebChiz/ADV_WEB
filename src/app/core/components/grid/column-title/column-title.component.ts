import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IColumnSort, SortDirection } from 'src/app/core/models/filters/column-filter.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridSorting } from 'src/app/core/store/grid/grid.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-grid-column-title',
	templateUrl: './column-title.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnTitleComponent implements OnInit, OnDestroy {
	sorting: IColumnSort | null = null;

	sorting$: any;

	@Input() gridId!: string;

	@Input() filterId!: string;

	@Input() column!: string;

	@Input() title!: string;

	show = false;

	private _destroy$ = new Subject();

	constructor(public _store: Store<IAppState>) {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	ngOnInit(): void {
		this.sorting = null;
		this.sorting$ = this._store.pipe(
			select(selectGridSorting, {
				gridId: this.gridId,
				name: this.column,
			}),
			takeUntil(this._destroy$),
		);
		this.sorting$.subscribe((s: any) => {
			if (s) {
				this.sorting = s;
				this.show = true;
			}
		});
	}

	showNone() {
		return this.sorting?.direction === SortDirection.None;
	}

	showAsc() {
		return this.sorting?.direction === SortDirection.Asc;
	}

	showDesc() {
		return this.sorting?.direction === SortDirection.Desc;
	}

	onSelect(): void {
		if (this.sorting) {
			const direction = (this.sorting.direction + 1) % 3;
			this._store.dispatch(
				GridActions.SetColumnSortingDirection({
					gridId: this.gridId,
					name: this.column,
					direction,
				}),
			);
			this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
		}
	}
}
