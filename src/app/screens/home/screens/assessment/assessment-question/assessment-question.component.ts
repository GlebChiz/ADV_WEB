import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AssessmentQuestionActions } from './store/actions/assessment-question.actions';

@Component({
	providers: [],
	selector: 'advenium-assessment-question',
	templateUrl: './assessment-question.component.html',
})
export class AssessmentQuestionComponent implements OnInit {
	public constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {}

	public assessmentQuestion$: Observable<any> = this.store.select('assessment');

	public ngOnInit(): void {
		this.store.dispatch(
			AssessmentQuestionActions.GetAssessmentQuestionPending({
				id: this.activatedRoute.snapshot.params.id,
			}),
		);
	}
}
