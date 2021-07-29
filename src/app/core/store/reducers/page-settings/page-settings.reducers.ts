import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { PageSettingsActions } from '../../actions/page-settings/page-settings.actions';
import {
	initialPageSettings,
	IPageSettingsState,
} from '../../state/page-settings/page-settings.state';

export function pageSettingsReducers(
	pageState: IPageSettingsState,
	action: Action,
): IPageSettingsState {
	return createReducer(
		initialPageSettings,
		on(PageSettingsActions.SetTitle, (state, payload) => payload.settings),
	)(pageState, action);
}
