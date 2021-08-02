import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { selectPageSettings } from 'src/app/core/store/selectors/page-settings/psge-settings.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { IPageSettingsState } from 'src/app/core/store/state/page-settings/page-settings.state';

@Component({
	selector: 'advenium-layout-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnDestroy, OnInit {
	constructor(private _store: Store<IAppState>) {}

	pageSettings$!: Observable<IPageSettingsState>;

	private _destroy$ = new Subject();

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	ngOnInit(): void {
		this.pageSettings$ = this._store.select(selectPageSettings);
	}
}
