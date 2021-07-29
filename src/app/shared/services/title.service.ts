import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageSettings } from '../../core/models/page-settings.model';
import { IAppState } from '../../core/store/state/app.state';
import { PageSettingsActions } from '../../core/store/actions/page-settings/page-settings.actions';

@Injectable({ providedIn: 'root' })
export class TitleService {
	constructor(private _store: Store<IAppState>) {}

	setTitle(settings: PageSettings) {
		
		this._store.dispatch(PageSettingsActions.SetTitle({ settings }));
	}
}
