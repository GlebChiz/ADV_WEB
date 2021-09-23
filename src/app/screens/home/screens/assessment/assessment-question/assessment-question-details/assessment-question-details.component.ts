import { ITable } from './../../../../../../shared/table/table.reducer';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { AssessmentQuestionDetailsActions } from './store/actions/assessment-question-details.actions';

@Component({
	providers: [],
	selector: 'advenium-assessment-question-details',
	templateUrl: './assessment-question-details.component.html',
})
export class AssessmentQuestionDetailsComponent implements OnInit {
	public constructor(
		private store: Store<ITable<IAssessmentQuestion, IAssessmentQuestion>>,
		private activatedRoute: ActivatedRoute,
	) {}

	public sessionPlanDetails$: Observable<IAssessmentQuestion> = this.store.select(
		'sessionplans,
	);

	public ngOnInit(): void {
		this.store.dispatch(
			AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
