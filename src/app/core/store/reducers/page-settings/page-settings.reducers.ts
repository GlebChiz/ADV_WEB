import { Action, createReducer, on } from '@ngrx/store';
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
		on(PageSettingsActions.SetTitle, (_state, payload) => payload.settings),
	)(pageState, action);
}
