/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { AssessmentLegendTableActions } from './assessment-legend-table.actions';

const tableReducers: any = tableReducersFactory(
	AssessmentLegendTableActions.UpdateAssessmentLegendTableState,
	AssessmentLegendTableActions.GetAssessmentLegendTableDataPending,
	AssessmentLegendTableActions.GetCurrentItemSuccess,
	AssessmentLegendTableActions.GetAssessmentLegendTableDataError,
	AssessmentLegendTableActions.GetAssessmentLegendTableDataSuccess,
	AssessmentLegendTableActions.ClearCurrentAssessmentLegend,
);

export function assessmentLegendTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
