import { createAction, props } from '@ngrx/store';
import { IPageSettings } from 'src/app/core/models/page-settings.model';

export const PageSettingsActions = {
	SetTitle: createAction('[Page Settings] Set Page Settings', props<{ settings: IPageSettings }>()),
};
