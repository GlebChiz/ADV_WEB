import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Align } from '@progress/kendo-angular-popup';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridInfo } from 'src/app/core/store/grid/grid.selectors';
import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';

import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-layout-grid-columns-chooser',
	templateUrl: './columns-chooser.component.html',
	styleUrls: ['./columns-chooser.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnsChooserComponent implements OnInit, OnDestroy {
	@Input() gridId!: string;

	@Input() filterId!: string;

	gridInfo$: any;

	columns: IGridColumnInfo[] | null = null;

	show = false;

	private _destroy$ = new Subject();

	anchorAlign: Align = { horizontal: 'left', vertical: 'bottom' };

	popupAlign: Align = { horizontal: 'left', vertical: 'top' };

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
				this.columns = Object.values(gi.columns);
			}
		});
	}

	public onToggle(): void {
		this.show = !this.show;
	}

	onSelect(item: IGridColumnInfo): void {
		this._store.dispatch(
			GridActions.SetColumnVisability({
				gridId: this.gridId,
				name: item.name,
				visible: item.visible === false,
			}),
		);
	}
}
