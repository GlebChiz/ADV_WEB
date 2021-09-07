import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { ITableState } from 'src/app/shared/table/table.reducer';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-assessment-template-popup',

	templateUrl: './assessment-template-popup.component.html',
})
export class AssessmentTemplatePopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}

	public assessmentTemplate!: any;

	public assessmentTemplateForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.assessmentTemplate, ...this.assessmentTemplate.value });
	}

	public initForm(): void {
		this.assessmentTemplateForm = new FormGroup({
			id: new FormControl(),
			questionId: new FormControl(),
			responseOption: new FormControl(),
			text: new FormControl(),
			type: new FormControl(),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetServiceSubTypesPending());
		this._store
			.select('assessmentTemplateTable')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((cliniciansTable: unknown) => {
				this.assessmentTemplate = (cliniciansTable as ITableState<any, any>).current;
				this.initForm();
			});
	}
}
