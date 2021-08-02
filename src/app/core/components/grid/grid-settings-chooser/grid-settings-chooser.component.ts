import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { combineLatest, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonGridService } from 'src/app/core/services/grid.service';
import { FilterActions } from 'src/app/core/store/filter/filter.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { selectGridInfo } from 'src/app/core/store/grid/grid.selectors';
import { IGridInfo } from 'src/app/core/store/grid/grid.state';

import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-grid-settings-chooser',
	templateUrl: './grid-settings-chooser.component.html',
	styleUrls: ['./grid-settings-chooser.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IGridSettingsChooserComponent implements OnInit, OnDestroy {
	@Input() gridId!: string;

	@Input() filterId!: string;

	lookup: IGridInfo[] = [];

	currentId!: Guid;

	currentTitle!: string;

	show = false;

	private _destroy$ = new Subject();

	constructor(private _store: Store<IAppState>, private _service: CommonGridService) {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	getTitle() {
		if (this.currentId === null) {
			return 'No Saved Views';
		}
		const item = this.lookup.filter((x) => x.id === this.currentId)[0];
		if (!item) {
			return 'Not Found';
		}
		return item.title;
	}

	ngOnInit(): void {
		this.setCurrent(null, 'default');
	}

	actions() {
		const list = [];
		if (this.lookup.length === 0) {
			list.push({
				title: 'Save as Default',
				cmd: 'save',
			});
		} else {
			list.push({
				title: 'Save',
				cmd: 'save',
			});
			list.push({
				title: 'Save as New',
				cmd: 'create',
			});
		}
		const item = this.lookup.filter((x) => x.id === this.currentId)[0];
		if (item && item.isDefault !== true) {
			list.push({
				title: 'Make Default',
				cmd: 'default',
			});
		}
		list.push({
			title: 'Rename',
			cmd: 'rename',
		});
		/*
    if (this.lookup) {
      list.push({
        title: '- - - - - - ',
        cmd: 'separator'
      });
      this.lookup.forEach(l => {
        list.push({
          title: l.title,
          cmd: 'item',
          item: l
        });
      });
    } */
		return list;
	}

	onSave(result: any, id: Guid | string | null) {
		if (result.isSuccess === true) {
			this.setCurrent(id, 'last');
		}
	}

	saveCurrentView(duplicate: boolean = false) {
		this._store
			.pipe(select(selectGridInfo, { gridId: this.gridId }))
			.pipe(take(1))
			.subscribe((s) => {
				if (s.columns) {
					if (!s.id || s.id.toString() === Guid.EMPTY || duplicate === true) {
						s.id = Guid.EMPTY;
						this._service.createIGridSettings(s).subscribe((result) => {
							this.onSave(result, null);
						});
					} else {
						this._service.updateIGridSettings(s).subscribe((result) => {
							this.onSave(result, s.id);
						});
					}
				}
			});
	}

	makeDefault() {
		if (this.currentId) {
			this._service.makeIGridSettingsDefault(this.currentId).subscribe((result) => {
				this.onSave(result, this.currentId);
			});
		}
	}

	onAction(e: any) {
		switch (e.cmd) {
			case 'save':
				this.saveCurrentView();
				break;
			case 'create':
				this.saveCurrentView(true);
				break;
			case 'default':
				this.makeDefault();
				break;
			default:
				break;
		}
	}

	setCurrent(id: Guid | string | null, type: string | null) {
		this._service.getGridViews(this.gridId).subscribe((x) => {
			this.lookup = x;
			if (x && x.length > 0) {
				const gridInfo$ = this._store
					.pipe(select(selectGridInfo, { gridId: this.gridId }))
					.pipe(take(2));
				// eslint-disable-next-line no-nested-ternary
				const action$ = id
					? this._service.getIGridSettings(id)
					: type === 'default'
					? this._service.getDefaultIGridSettings(this.gridId)
					: this._service.getLastIGridSettings(this.gridId);
				combineLatest([gridInfo$, action$]).subscribe(([grid, settings]) => {
					let info = this._service.getGridInfo(Object.values(grid.columns), this.gridId);
					info = this._service.mergeGridInfo(info, settings);
					this.currentId = settings.id;
					this.currentTitle = this.getTitle();
					this._store.dispatch(GridActions.SetGridInfo({ gridId: this.gridId, grid: info }));
					this._store.dispatch(FilterActions.TriggerFilter({ id: this.filterId }));
				});
			} else {
				this.currentTitle = this.getTitle();
			}
		});
	}

	onView(e: any) {
		this.setCurrent(e.id, 'default');
	}
}
