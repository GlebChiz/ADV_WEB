import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public assessmentTranslateForm: FormGroup = this._fb.group({
		id: [],
		languageId: [],
		original: [],
		translation: [],
	});

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.assessmentTranslateForm.value,
		});
	}

	public ngOnInit(): void {
		this._store
			.select('assessmentquestion' as any, 'additional')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentTranslate: any) => {
				this.assessmentTranslateForm.setValue(assessmentTranslate);
			});
		this.assessmentTranslateForm?.controls?.original?.disable();
	}
}

export interface IAssessmentTranslate {
	id: string;
	languageId: string;
	original: string;
	translation: string;
}
