import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ITableState } from '../../../../../../../shared/table/table.reducer';

@Component({
	selector: 'advenium-assessment-question-popup',
	templateUrl: './assessment-question-popup.component.html',
})
export class AssessmentQuestionPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _activatedRoute: ActivatedRoute,
	) {
		super();
	}

	public creating!: boolean;

	public language: FormControl = new FormControl();

	public assessment!: IAssessmentQuestion | undefined;

	public assessmentForm!: FormGroup;

	public legends$: Observable<IDropdownData[]> = this._store
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

	public initForm(): void {
		this._store.dispatch(DropdownActions.GetLegendsPending());
		this.assessmentForm = new FormGroup({
			text: new FormControl(this.assessment?.text || ''),
			legends: new FormControl(this.assessment?.legends || []),
		});
	}

	public ngOnInit(): void {
		this._store
			.select('assessmentquestionTable')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentQuestionTable: unknown) => {
				this.assessment = (
					assessmentQuestionTable as ITableState<IAssessmentQuestion, IAssessmentQuestion>
				).current;
				this.initForm();
			});
	}
}
