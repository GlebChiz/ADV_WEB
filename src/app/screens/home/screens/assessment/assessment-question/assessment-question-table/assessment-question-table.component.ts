/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	GET_TABLE_DATA_PENDING,
	GET_CURRENT_ITEM_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	CLEAR_CURRENT_ITEM,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	GET_GRID_SETTINGS_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
} from 'src/app/shared/table/table.tokens';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IColumn } from '../../../../../../shared/interfaces/column.interface';
import { AssessmentQuestionPopupComponent } from './assessment-question-popup/assessment-question-popup.component';
import { AssessmentQuestionTableActions } from './assessment-question-table.actions';
import { AssessmentQuestionTranslatePopupComponent } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

@Component({
	providers: [],
	selector: 'advenium-assessment-question-table',
	templateUrl: './assessment-question-table.component.html',
	styleUrls: ['../../../../home.component.scss'],
})
export class AssessmentQuestionTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private _router: Router,
		dialogService: DialogService,
		private _activatedRoute: ActivatedRoute,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,

		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
	) {
		super(
			_store,
			dialogService,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
			makeDefaultGridPending,
			renameGridPending,
		);
	}

	public id: string = '';

	public language: FormControl = new FormControl();

	public languagesDropdown$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'languages',
	);

	public columns: IColumn[] = [
		{
			field: 'orderNumber',
			title: 'Order',
			hidden: false,
			filterable: false,
			type: 'text',
			style: { width: '100px', 'text-align': 'center' },
			headerStyle: { width: '100px' },
		},
		{
			field: 'text',
			title: 'Question',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'legends',
			title: 'Legends',
			hidden: false,
			filterable: false,
			includeInChooser: false,
			type: 'text',
		},
		{
			field: 'translated',
			title: 'Translated',
			hidden: true,
			filterable: false,
			type: 'text',
		},
		{
			field: 'templates',
			title: 'Templates',
			hidden: false,
			filterable: false,
			type: 'text',
		},
	];

	public selectionChangeLanguage(item: IDropdownData | undefined): void {
		if (item) {
			super.ngOnInit();
		}
	}

	public override ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this.language.valueChanges.subscribe((language: string) => {
			const translatedColumn: IColumn | undefined = this.columns.find(
				(item: IColumn) => item.field === 'translated',
			);
			if (translatedColumn) {
				translatedColumn.hidden = !language;
				if (language === '4dc1ef9d-76e3-4b70-8b0d-7109661ec568') {
					translatedColumn.hidden = true;
					return;
				}
			}
		});
		this._activatedRoute.params.subscribe((params: Params) => {
			this.addFiltersSorting(params.id);
			this.id = params.id || '';
			super.ngOnInit();
		});
	}

	public reorder(isUp: boolean, dataitem: IAssessmentQuestion): void {
		this._store.dispatch(
			AssessmentQuestionTableActions.ReorderAssessmentQuestionPending({
				controller: this.controller,
				questionId: dataitem.id,
				assessmentId: this.id,
				index: isUp ? dataitem.orderNumber + 1 : dataitem.orderNumber - 1,
			}),
		);
	}

	public addFiltersSorting(id: string | undefined): void {
		if (this.gridSettings.state.filter) {
			if (id) {
				this.gridSettings.state.sort = [
					{
						field: 'orderNumber',
						dir: 'asc',
					},
				];

				this.gridSettings.state.filter.filters = [
					...this.gridSettings.state.filter.filters,
					{
						field: 'assessmentId',
						operator: 'custom',
						value: id,
					},
				];

				return;
			}
			this.gridSettings.state.sort = [];
			this.gridSettings.state.filter.filters = this.gridSettings.state.filter.filters.filter(
				(item: any) => item.operator !== 'custom',
			);
		}
	}

	public onCellClick(dataItem: any): void {
		this._router.navigate(['templates', dataItem.id], { relativeTo: this._activatedRoute });
	}

	public toAssessments(): void {
		this._router.navigate(['assessments']);
	}

	public openDialog(dataItem?: IAssessmentQuestion, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assessment Question',
			content: AssessmentQuestionPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.assessment = { ...dataItem };
		if (!dataItem) {
			dialog.content.instance.creating = true;
		}
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				if (isDublicate) {
					result.id = null;
				}
				if (dataItem && !isDublicate) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}
				this._store.dispatch(this.createDataPending({ item: result, controller: this.controller }));
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	public openDialogTranslate(questionId: string): void {
		this._store.dispatch(
			AssessmentQuestionTableActions.GetCurrentTranslationAssessmentQuestionPending({
				questionId,
				languageId: this.language.value,
			}),
		);
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assessment Question Translate',
			content: AssessmentQuestionTranslatePopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					AssessmentQuestionTableActions.UpdateCurrentTranslationAssessmentQuestionPending({
						questionId,
						languageId: this.language.value,
						currentTranslation: result,
						controller: this.controller,
					}),
				);
				return;
			}
		});
	}

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}
}
