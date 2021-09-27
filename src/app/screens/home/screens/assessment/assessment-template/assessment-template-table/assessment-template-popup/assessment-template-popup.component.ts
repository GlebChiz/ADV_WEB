import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
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
		private _fb: FormBuilder,
	) {
		super();
	}

	public assessmentTemplateForm: FormGroup = this._fb.group({
		id: [],
		questionId: [],
		responseOption: [],
		text: [],
		type: [],
	});

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
		this._dialogService.close(this.assessmentTemplateForm.value);
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
			.select('assessmentnotetemplate', 'table', 'current')
			.pipe(filter<IAssessmentTemplate>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentTemplate: IAssessmentTemplate) => {
				this.assessmentTemplateForm.setValue({
					...assessmentTemplate,
					questionId: this._activatedRoute?.snapshot?.params?.id,
				});
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

export interface IAssessmentTemplate {
	id: string;
	criteria: string;
	responseOption: number;
	text: string;
	questionId: string;
	type: number;
}
