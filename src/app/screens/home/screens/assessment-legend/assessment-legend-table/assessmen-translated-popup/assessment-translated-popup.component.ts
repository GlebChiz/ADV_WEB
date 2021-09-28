import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { AssessmentLegendTableActions } from '../assessment-legend-table.actions';

@Component({
	selector: 'advenium-assessment-translated-popup',
	templateUrl: './assessment-translated-popup.component.html',
})
export class AssessmentTranslatedPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public types: IButtonSelector[] = [
		{ name: 'Pre-Assessment', id: '1' },
		{ name: 'Post-Assessment', id: '2' },
	];

	public creating!: boolean;

	public language: FormControl = new FormControl();

	public assessmentTranslated!: { languageId: string; id: string };

	public assessmentForm: FormGroup = this._fb.group({
		original: [],
		translation: [],
	});

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.assessmentTranslated,
			...this.assessmentForm.value,
		});
	}

	public ngOnInit(): void {
		const { id, languageId }: { id: string; languageId: string } = this.assessmentTranslated;
		this._store.dispatch(AssessmentLegendTableActions.GetTranslationPending({ languageId, id }));
		this._store
			.select('assessmentlegend', 'tranlsated')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((item: any) => {
				this.assessmentForm.get('original')?.disable();
				this.assessmentForm.setValue({
					original: item.original || '',
					translation: item.translation || '',
				});
			});
	}
}
