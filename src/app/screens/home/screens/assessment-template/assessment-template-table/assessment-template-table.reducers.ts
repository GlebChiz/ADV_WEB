/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';

import { AssessmentTemplateTableActions } from './assessment-template-table.actions';

const tableReducers: any = tableReducersFactory(
	AssessmentTemplateTableActions.UpdateAssessmentTemplateTableState,
	AssessmentTemplateTableActions.GetAssessmentTemplateTableDataPending,
	AssessmentTemplateTableActions.GetCurrentItemSuccess,
	AssessmentTemplateTableActions.GetAssessmentTemplateTableDataError,
	AssessmentTemplateTableActions.GetAssessmentTemplateTableDataSuccess,
	AssessmentTemplateTableActions.ClearCurrentAssessmentTemplate,
);

export function assessmentTemplateTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
