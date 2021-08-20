import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AssessmentQuestionDetailsActions } from './store/actions/assessment-question-details.actions';

@Component({
	providers: [],
	selector: 'advenium-assessment-question-details',
	templateUrl: './assessment-question-details.component.html',
})
export class AssessmentQuestionDetailsComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public sessionPlanDetails$: Observable<any> = this.store.select('sessionplans');

	public ngOnInit(): void {
		this.store.dispatch(
			AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
