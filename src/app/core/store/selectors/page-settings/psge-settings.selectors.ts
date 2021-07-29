import { createSelector } from '@ngrx/store';
import { IAppState } from '../../state/app.state';
import { IPageSettingsState } from '../../state/page-settings/page-settings.state';

const pageSettingsState = (state: IAppState) => state.pageSettingsState;

export const selectPageSettings = createSelector(
	pageSettingsState,
	(state: IPageSettingsState) => state,
);
