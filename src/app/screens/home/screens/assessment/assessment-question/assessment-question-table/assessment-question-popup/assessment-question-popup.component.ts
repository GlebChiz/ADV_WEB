import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { IDropdownData, IDropDownState } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ITable } from 'src/app/shared/table/table.reducer';

@Component({
	selector: 'advenium-assessment-question-popup',
	templateUrl: './assessment-question-popup.component.html',
})
export class AssessmentQuestionPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<ITable<IAssessmentQuestion, IAssessmentQuestion>>,
		private _storeDd: Store<IDropDownState>,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
	) {
		super();
	}

	public creating!: boolean;

	public language: FormControl = new FormControl();

	public assessment!: IAssessmentQuestion | undefined;

	public assessmentForm: FormGroup = this._formBuilder.group({
		text: [''],
		legends: [[]],
	});

	public legends$: Observable<IDropdownData[]> = this._storeDd
		.select('dropdown', 'legends')
		.pipe(takeUntil(this.unsubscribe$$));

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		let obj: any = {
			...this.assessment,
			...this.assessmentForm.value,
		};
		if (this.creating) {
			obj = { ...obj, assessmentId: this._activatedRoute.snapshot.params.id, orderNumber: -1 };
		}
		this._dialogService.close(obj);
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLegendsPending());
		this._store
			.select('assessmentquestion' as any, 'table', 'current')
			.pipe(takeUntil(this.unsubscribe$$))
			.subscribe((current: IAssessmentQuestion) => {
				this.assessment = current;
				this.assessmentForm.patchValue({
					text: current?.text ?? '',
					legends: current?.legends ?? [],
				});
			});
	}
}
