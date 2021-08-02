import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortDirection } from 'src/app/core/models/filters/column-filter.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridInfo } from 'src/app/core/store/grid/grid.selectors';
import { IGridColumnInfo, IGridInfo } from 'src/app/core/store/grid/grid.state';

import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-grid-sort-editor',
	templateUrl: './column-sort-editor.component.html',
	styleUrls: ['./column-sort-editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnsSortEditorComponent implements OnInit, OnDestroy {
	@Input() gridId!: string;

	@Input() filterId!: string;

	gridInfo$: any;

	gridInfo: IGridInfo | null = null;

	show = false;

	private _destroy$ = new Subject();

	constructor(private _store: Store<IAppState>) {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	ngOnInit(): void {
		this.gridInfo$ = this._store.pipe(
			select(selectGridInfo, { gridId: this.gridId }),
			takeUntil(this._destroy$),
		);

		this.gridInfo$.subscribe((gi: any) => {
			if (gi.columns) {
				this.gridInfo = gi;
				if (this.show) {
					// this.reset();
				}
			}
		});
	}

	public onToggle(): void {
		this.show = !this.show;
	}

	apply(): void {
		this.show = false;
	}

	reset(): void {
		this.show = false;
		setTimeout(() => (this.show = true));
	}

	columns() {
		let active: any[] = [];
		const inactive: Object[] = [];
		Object.values(this.gridInfo!.columns)
			.filter((c: IGridColumnInfo) => c.sortDirection)
			.forEach((c: IGridColumnInfo) => {
				const sorting = this.gridInfo!.sorting[c.name] || null;
				const sort = {
					direction: sorting?.direction || SortDirection.None,
					order: sorting?.order || 0,
					title: c.title,
					name: c.name,
				};
				if (sort.direction === SortDirection.None) {
					inactive.push(sort);
				} else {
					active.push(sort);
				}
			});
		active = active.sort((a, b) => a.order - b.order);
		for (let i = 0; i < active.length; i++) {
			active[i].order = i + 1;
		}
		return active.concat(inactive);
	}

	showAsc(item: any) {
		return item.direction === SortDirection.Asc;
	}

	showDesc(item: any) {
		return item.direction === SortDirection.Desc;
	}

	showNone(item: any) {
		return item.direction === SortDirection.None;
	}

	onSelect(item: any) {
		const direction = (item.direction + 1) % 3;
		this._store.dispatch(
			GridActions.SetColumnSortingDirection({
				gridId: this.gridId,
				name: item.name,
				direction,
			}),
		);
		this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
	}

	isNotFirst(item: any) {
		return item.direction !== SortDirection.None && item.order > 1;
	}

	private move(item: any, step: number) {
		const next = this.columns().filter((x) => x.direction > 0 && x.order === item.order + step)[0];
		if (next) {
			const newSorting: any = {};
			this.columns().forEach((c) => {
				let { order } = c;
				if (order === item.order) {
					order += step;
				} else if (order === item.order + step) {
					order -= step;
				}

				newSorting[c.name] = {
					order,
					column: c.name,
					direction: c.direction,
				};
			});
			this._store.dispatch(
				GridActions.SetGridSorting({
					gridId: this.gridId,
					sorting: newSorting,
				}),
			);
			this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
		}
	}

	moveUp(item: any) {
		this.move(item, -1);
	}

	moveDown(item: any) {
		this.move(item, 1);
	}
}
