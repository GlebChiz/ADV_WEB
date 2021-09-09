import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IStore } from 'src/app/store';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'advenium-assessment-question-translate-popup',
	templateUrl: './assessment-question-translate-popup.component.html',
})
export class AssessmentQuestionTranslatePopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public assessmentTranslate!: IAssessmentQuestionTranslate | undefined;

	public assessmentTranslateForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.assessmentTranslate,
			...this.assessmentTranslateForm.value,
		});
	}

	public initForm(): void {
		this.assessmentTranslateForm = new FormGroup({
			original: new FormControl(this.assessmentTranslate?.original || ''),
			translation: new FormControl(this.assessmentTranslate?.translation || []),
		});
		this.assessmentTranslateForm?.controls?.original?.disable();
	}

	public ngOnInit(): void {
		this._store
			.select('assessmentquestionTable' as any, 'assessmentQuestionTranslate')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentTranslate: any) => {
				this.assessmentTranslate = assessmentTranslate;
				this.initForm();
			});
		this.initForm();
	}
}

export interface IAssessmentQuestionTranslate {
	id: string;
	languageId: string;
	original: string;
	translation: string;
}
