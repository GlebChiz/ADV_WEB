import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AssessmentQuestionDetailsService } from '../../services/assessment-question-details.service';
import { AssessmentQuestionDetailsActions } from '../actions/assessment-question-details.actions';

@Injectable()
export class AssessmentQuestionDetailsEffects {
	public constructor(
		private actions$: Actions,
		private service: AssessmentQuestionDetailsService,
	) {}

	public getSessionPlanDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getAssessmentQuestionDetails(id).pipe(
					map((current: any) =>
						AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsSuccess({ current }),
					),
					catchError((error: any) => {
						console.log(error);
						return of(AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsError());
					}),
				),
			),
		),
	);
}
