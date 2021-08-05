import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	IColumnFilter,
	IColumnFilterDataType,
	ColumnFilterType,
	ColumnFilterTypeNames,
} from 'src/app/core/models/filters/column-filter.model';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridFilter } from 'src/app/core/store/grid/grid.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-grid-column-filter',
	templateUrl: './column-filter.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnFilterComponent implements OnInit, OnDestroy {
	public filter!: IColumnFilter;

	@Input() public gridId!: string;

	@Input() public filterId!: string;

	@Input() public column!: string;

	public showPopup = false;

	public show = false;

	public filter$: Observable<IColumnFilter> | null = null;

	private _destroy$ = new Subject();

	public constructor(public _store: Store<IAppState>) {}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public ngOnInit(): void {
		this.filter = null!;
		this.filter$ = this._store.pipe(
			select(selectGridFilter, {
				gridId: this.gridId,
				name: this.column,
			}),
			takeUntil(this._destroy$),
		);
		this.filter$.subscribe((f) => {
			if (f) {
				this.filter = f;
				this.show = true;
			}
		});
	}

	public isValueFilter(): boolean {
		return this.show && this.filter?.dataType === IColumnFilterDataType.String;
	}

	public isIntervalFilter(): boolean {
		return this.show && this.filter?.dataType === IColumnFilterDataType.Interval;
	}

	public isDateFilter(): boolean {
		return this.show && this.filter?.dataType === IColumnFilterDataType.Date;
	}

	public title() {
		if (this.show !== true) {
			return '';
		}
		const isNegative = this.filter!.type < 0;
		const text = ColumnFilterTypeNames[isNegative ? -this.filter!.type : this.filter!.type];
		return `${isNegative ? 'not ' : ''}${text}`;
	}

	public operations(): any {
		const list: any = [];
		const types = this.operationTypes();
		types.forEach((t) =>
			list.push({
				name: ColumnFilterTypeNames[t],
				type: t,
			}),
		);
		types.forEach((t) =>
			list.push({
				name: `not ${ColumnFilterTypeNames[t]}`,
				type: -t,
			}),
		);
		return list;
	}

	public operationTypes(): ColumnFilterType[] {
		let list: ColumnFilterType[] = [];

		if (
			this.filter!.dataType === IColumnFilterDataType.Date ||
			this.filter!.dataType === IColumnFilterDataType.Interval
		) {
			list = [
				ColumnFilterType.Equal,
				ColumnFilterType.More,
				ColumnFilterType.Less,
				ColumnFilterType.MoreEqual,
				ColumnFilterType.LessEqual,
				ColumnFilterType.Empty,
			];
			if (this.filter!.dataType === IColumnFilterDataType.Interval) {
				list.push(ColumnFilterType.Between);
			}
		} else if (this.filter!.dataType === IColumnFilterDataType.String) {
			list = [
				ColumnFilterType.Equal,
				ColumnFilterType.Contains,
				ColumnFilterType.StartsWith,
				ColumnFilterType.EndsWith,
				ColumnFilterType.Empty,
			];
		}
		return list;
	}

	public onToggle(): void {
		this.showPopup = !this.showPopup;
	}

	public onSelect(item: any): void {
		this._store.dispatch(
			GridActions.SetColumnFilterType({
				gridId: this.gridId,
				name: this.column,
				filterType: item.type,
			}),
		);
		this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
	}
}
