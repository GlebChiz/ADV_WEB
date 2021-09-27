import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { Observable } from 'rxjs';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';
import { IAssessment } from 'src/app/shared/interfaces/assessment.interface';

@Component({
	selector: 'advenium-assessment-popup',
	templateUrl: './assessment-popup.component.html',
})
export class AssessmentPopupComponent extends UnSubscriber implements OnInit {
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

	public modalities$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'modalities')
		.pipe(takeUntil(this.unsubscribe$$));

	public sex$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'sex')
		.pipe(takeUntil(this.unsubscribe$$));

	public assessmentForm: FormGroup = this._fb.group({
		id: [],
		patientId: [],
		modalityId: [],
		patientName: [],
		type: [],
		title: [],
		sexId: [],
		ageFrom: [],
		ageTo: [],
	});

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.assessmentForm.value,
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSexPending());
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store
			.select('assessment', 'table', 'current')
			.pipe(filter<IAssessment>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessment: IAssessment) => {
				this._store.dispatch(DropdownActions.GetLegendsPending());
				this.assessmentForm.get('patientName')?.disable();
				this.assessmentForm.setValue({
					...assessment,
					type: assessment?.type.toString() || '1',
				});
			});
	}
}
