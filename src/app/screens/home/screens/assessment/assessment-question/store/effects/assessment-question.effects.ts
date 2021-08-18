import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AssessmentQuestionService } from '../../services/assessment-question.service';
import { AssessmentQuestionActions } from '../actions/assessment-question.actions';

@Injectable()
export class AssessmentQuestionEffects {
	public constructor(private actions$: Actions, private service: AssessmentQuestionService) {}

	public getAssessmentQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AssessmentQuestionActions.GetAssessmentQuestionPending),
			switchMap(({ id }: { id: string }) =>
				this.service.getAssessmentQuestion(id).pipe(
					map((current: any) =>
						AssessmentQuestionActions.GetAssessmentQuestionSuccess({ current }),
					),
					catchError(() => of(AssessmentQuestionActions.GetAssessmentQuestionError())),
				),
			),
		),
	);
}
