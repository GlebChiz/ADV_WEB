import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';
import { ISessionPlanTranslate } from './session-plan-translate-popup/session-plan-translate-popup.component';

export const SessionPlanTableActions = {
	GetSessionPlanTableDataPending: createAction(
		'[Session Plan Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetSessionPlanTableDataSuccess: createAction(
		'[Session Plan Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetSessionPlanTableDataError: createAction(
		'[Session Plan Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateSessionPlanTableState: createAction('[Session Plan Table] Update', props<{ data: any }>()),

	DeleteSessionPlanIemTablePending: createAction(
		'[Session Plan Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteSessionPlanIemTableError: createAction(
		'[Session Plan Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteSessionPlanIemTableSuccess: createAction(
		'[Session Plan Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateSessionPlanIemTablePending: createAction(
		'[Session Plan Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSessionPlanIemTableError: createAction(
		'[Session Plan Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSessionPlanIemTableSuccess: createAction(
		'[Session Plan Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateSessionPlanIemTablePending: createAction(
		'[Session Plan Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateSessionPlanIemTableError: createAction(
		'[Session Plan Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateSessionPlanIemTableSuccess: createAction(
		'[Session Plan Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditSessionPlanIemTablePending: createAction(
		'[Session Plan Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditSessionPlanIemTableError: createAction(
		'[Session Plan Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditSessionPlanIemTableSuccess: createAction(
		'[Session Plan Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Session Plan Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Session Plan Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Session Plan Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentSessionPlan: createAction('[Session Plan Table] Clear current SessionPlan'),
	ClearSessionPlanTable: createAction('[Session Plan Table] Clear'),
	ReorderPlanPending: createAction(
		'[Session Plan Reorder] Reorder current item pending',
		props<{
			controller: string;
			seriesPlanId: string;
			sessionPlanId: string;
			index: number;
			storePath: string;
		}>(),
	),
	ReorderPlanSuccess: createAction('[Session Plan Reorder] Reorder current item success'),
	ReorderPlanError: createAction('[Session Plan Reorder] Reorder current item error'),

	LinkSessionPlansPending: createAction(
		'[Session Plan] Link Session Plans Pending',
		props<{
			controller: string;
			ids: string[];
			seriesPlanId: string;
			link: boolean;
			storePath: string;
		}>(),
	),
	LinkSessionPlansError: createAction('[Session Plans] Link Session Plans Error'),
	LinkSessionPlansSuccess: createAction('[Session Plan] Link Session Plans Success'),

	GetCurrentTranslationSessionPlanPending: createAction(
		'[Session Plan] Get current translation pending',
		props<{ languageId: string; sessionPlanId: string }>(),
	),
	GetCurrentTranslationSessionPlanSuccess: createAction(
		'[Session Plan] Get current translation success',
		props<{ currentTranslation: any }>(),
	),
	GetCurrentTranslationSessionPlanError: createAction(
		'[Session Plan] Get current translation error',
	),

	UpdateCurrentTranslationSessionPlanPending: createAction(
		'[Session Plan] Update current translation pending',
		props<{
			sessionPlanId: string;
			languageId: string;
			currentTranslation: ISessionPlanTranslate;
			controller: string;
		}>(),
	),
	UpdateCurrentTranslationSessionPlanSuccess: createAction(
		'[Session Plan] Update current translation success',
	),
	UpdateCurrentTranslationSessionPlanError: createAction(
		'[Session Plan] Update current translation error',
	),
};
