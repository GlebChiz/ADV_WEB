import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { ICheckList } from '../../models/checklist.model';

export const ChecklistActions = {
	GetChecklist: createAction('[Checklist] Get checklist', props<{ id: Guid }>()),
	SetChecklist: createAction('[Checklist] Set checklist', props<{ checklist: ICheckList }>()),
};
