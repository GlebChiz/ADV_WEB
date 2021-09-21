import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { ITable } from 'src/app/shared/table/table.reducer';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-assessment-template-popup',

	templateUrl: './assessment-template-popup.component.html',
})
export class AssessmentTemplatePopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _activatedRoute: ActivatedRoute,
	) {
		super();
	}

	public assessmentTemplate!: IAssessmentTemplateInterface;

	public assessmentTemplateForm!: FormGroup;

	public currentPositionCursorTextares!: number;

	public criteriasType$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'criterias')
		.pipe(takeUntil(this.unsubscribe$$));

	public responseOption$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'responseOption')
		.pipe(takeUntil(this.unsubscribe$$));

	public autoNotePrefills$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'autoNotePrefills')
		.pipe(takeUntil(this.unsubscribe$$));

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.assessmentTemplateForm.value });
	}

	public initForm(): void {
		this.assessmentTemplateForm = new FormGroup({
			questionId: new FormControl(this._activatedRoute?.snapshot?.params?.id),
			responseOption: new FormControl(this.assessmentTemplate?.responseOption || ''),
			text: new FormControl(this.assessmentTemplate?.text || ''),
			type: new FormControl(this.assessmentTemplate?.type || ''),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetResponseOptionPending());
		this._store.dispatch(DropdownActions.GetAutoNotePrefillsPending());
		this._store.dispatch(
			DropdownActions.GetCriteriasTypePending({
				questionId: this._activatedRoute?.snapshot?.params?.id,
			}),
		);

		this._store
			.select('assessmentnotetemplate', 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentTemplateTable: unknown) => {
				this.assessmentTemplate = (assessmentTemplateTable as ITable<any, any>).current;
				this.initForm();
			});
	}

	public getCurrentPositionCursorTextares(oField: HTMLTextAreaElement): void {
		this.currentPositionCursorTextares = oField.selectionStart;
	}

	public addToTexterea(name: string): void {
		const text: AbstractControl | null = this.assessmentTemplateForm.get('text');
		const res: string =
			text?.value.substring(0, this.currentPositionCursorTextares) +
			name +
			text?.value.substring(this.currentPositionCursorTextares, text?.value.length);
		text?.setValue(res);
	}
}

export interface IAssessmentTemplateInterface {
	id: string;
	criteria: string;
	responseOption: number;
	text: string;
	questionId: string;
	type: number;
}
