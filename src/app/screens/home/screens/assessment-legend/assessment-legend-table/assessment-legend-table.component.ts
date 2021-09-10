import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	GET_TABLE_DATA_PENDING,
	GET_CURRENT_ITEM_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
} from 'src/app/shared/table/table.tokens';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { AssessmentTranslatedPopupComponent } from './assessmen-translated-popup/assessment-translated-popup.component';
import { AssessmentLegendTableActions } from './assessment-legend-table.actions';

@Component({
	providers: [],
	selector: 'advenium-assessment-legend-table',
	templateUrl: './assessment-legend-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class AssessmentLegendTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private dialogService: DialogService,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		// @Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	public languagesDropdown$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'languages',
	);

	public language: FormControl = new FormControl();

	public columns: IColumn[] = [
		{
			field: 'value',
			title: 'Value',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'text',
			title: 'Text',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'icon',
			title: 'Icon',
			hidden: false,
			filterable: false,
			type: 'text',
		},
		{
			field: 'translated',
			title: 'Translated',
			includeInChooser: false,
			hidden: true,
			filterable: false,
			type: 'text',
		},
	];

	public openDialog(dataItem?: any): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Assessment Legend Tranlsate',
			content: AssessmentTranslatedPopupComponent,
			width: 600,
			height: 500,
			minWidth: 250,
		});

		dialog.content.instance.assessmentTranslated = {
			legendId: dataItem.id,
			languageId: this.language.value,
		};
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(
					AssessmentLegendTableActions.SetTranslationPending({
						item: result,
						controller: this.controller,
					}),
				);
			}
			this._store.dispatch(AssessmentLegendTableActions.ClearAssessmentLegendTable());
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this.language.valueChanges.subscribe((language: string) => {
			const translatedColumn: IColumn | undefined = this.columns.find(
				(item: IColumn) => item.field === 'translated',
			);
			if (translatedColumn) {
				if (language === '4dc1ef9d-76e3-4b70-8b0d-7109661ec568') {
					translatedColumn.hidden = true;
					return;
				}
				super.ngOnInit();
				translatedColumn.hidden = !language;
			}
		});
		super.ngOnInit();
	}
}
