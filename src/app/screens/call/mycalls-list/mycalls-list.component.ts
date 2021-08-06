import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-mycalls-list',
	templateUrl: './mycalls-list.component.html',
})
export class MyCallsListComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public gridId = 'mycalls-list';

	public linkArray(
		// column: IGridColumnInfo,
		item: any,
	) {
		return ['/call', item.id];
	}

	public columns(): IGridColumnInfo[] {
		return [
			{
				name: 'callTime',
				title: 'Start Time',
				link: true,
				dataType: 'datetime',
			} as IGridColumnInfo,
			{ name: 'endTime', title: 'End Time', dataType: 'datetime' } as IGridColumnInfo,
			{ name: 'duration', title: 'Duration' } as IGridColumnInfo,
			{ name: 'callerType', title: 'Type' } as IGridColumnInfo,
			{ name: 'description', title: 'Description' } as IGridColumnInfo,
		];
	}

	public constructor(private _store: Store<IAppState>) {}

	public ngOnInit(): void {
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: 'My Calls' } }));
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}
}
