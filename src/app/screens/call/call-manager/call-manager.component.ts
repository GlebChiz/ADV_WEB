import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ICall, CallerType, ICallManagerStep } from 'src/app/core/models/call.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Guid } from 'guid-typescript';
import { CheckListItemStatus, CheckListItemType } from 'src/app/core/enums/checklist.types';
import { CallService } from 'src/app/core/services/call.service';
import { FormGroupType } from 'src/app/core/models/form.model';
import {
	IPersonAvailabilityFilter,
	PersonAvailabilityType,
} from 'src/app/core/models/availability.model';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { CRMSearchActions } from 'src/app/core/store/crmsearch/crmsearch.actions';

@Component({
	providers: [],
	selector: 'advenium-call-manager',
	templateUrl: './call-manager.component.html',
	styleUrls: ['./call-manager.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CallManagerComponent extends UnsubscriableBaseDirective implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() model!: ICall | null;

	show = true;

	expandedSteps: string[] = [];

	beforeNext: Subject<void> = new Subject<void>();

	suppressMessages = false;

	errors: string[] | null = null;

	messages: string[] | null = null;

	currentStep: ICallManagerStep | null = null;

	interStep: ICallManagerStep | null = null;

	steps: ICallManagerStep[] = [];

	reviews!: any[];

	constructor(
		public _store: Store<IAppState>,
		private _callService: CallService, // private _crmService: CRMSearchService, // private actions$: Actions,
	) {
		super();
		/* this.actions$.pipe(
                takeUntil(this.unsubscribe),
                ofType(CRMSearchActions.CallChanged)
              ).subscribe(({call}) => {
                this._crmService.addCallToState(call);
              });
              */
	}

	save() {
		this.interStep = this.currentStep;
		this.beforeNext.next();
		if (this.currentStep?.test === true) {
			this.confirmSave();
		}
	}

	refresh() {
		this.setStep(this.currentStep!);
		this.show = false;
		setTimeout(() => (this.show = true), 0);
	}

	changeStep(e: any, step: ICallManagerStep) {
		e.preventDefault();
		this.interStep = step;
		this.beforeNext.next();
		if (this.currentStep?.test === true) {
			this.confirmSave();
		}
	}

	isNew() {
		return !this.model || this.model.callerType === CallerType.Unknown;
	}

	isStepExpanded(id: string) {
		return this.expandedSteps.includes(id);
	}

	isStepExpandable(step: ICallManagerStep) {
		return step.items && step.items.length > 0;
	}

	isStepVisible(step: ICallManagerStep) {
		if (step.parentStepId) {
			return this.isStepExpanded(step.parentStepId);
		}
		return true;
	}

	expandStep(e: any, step: ICallManagerStep) {
		e.preventDefault();
		this.expandedSteps.push(step.id);
	}

	collapseStep(e: any, step: ICallManagerStep) {
		e.preventDefault();
		delete this.expandedSteps[this.expandedSteps.indexOf(step.id)];
	}

	confirmSave() {
		const { id } = this.model!;
		this.model = null;

		this._callService.getModel(id).subscribe((x) => {
			this.model = x;
			this._store.dispatch(CRMSearchActions.SetCall({ call: this.model! }));
			this.setStep(this.interStep!);
		});
	}

	private setStep(step: ICallManagerStep | null) {
		switch (this.model!.callerType) {
			case CallerType.Unknown:
				this.steps = this.getInitialSteps();
				break;
			case CallerType.Parent:
				this.steps = this.getParentSteps();
				break;
			case CallerType.Patient:
				this.steps = this.getPatientSteps();
				break;
			default:
				break;
		}
		if (this.currentStep === null) {
			this.currentStep = this.steps[0]!;
		} else if (step === null || this.currentStep.gotoNext === true) {
			const index = this.steps.findIndex((x) => x.id === this.currentStep!.id);
			this.currentStep = this.steps[index + 1]!;
		} else {
			const index = this.steps.findIndex((x) => x.id === step.id);
			this.currentStep = this.steps[index]!;
		}
		if (this.currentStep?.parentStepId && !this.isStepExpanded(this.currentStep.parentStepId)) {
			this.expandedSteps.push(this.currentStep.parentStepId);
		}
		this.reviews = this.getAllReviews();
	}

	ngOnInit(): void {
		this.setStep(null);
		this._store.dispatch(CRMSearchActions.ResetResult());
		this._store.dispatch(CRMSearchActions.SetCall({ call: this.model! }));
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	existingPatients() {
		return this.model!.patients;
	}

	isParent() {
		return this.model?.callerType === CallerType.Parent;
	}

	getStepStyle(step: ICallManagerStep) {
		return {
			border: step.id === this.currentStep?.id ? '1px solid blue' : '0px',
			'margin-left': `${step.left * 30}px`,
			display: this.isStepVisible(step) ? '' : 'none',
		};
	}

	getStepProgressClassName(step: ICallManagerStep) {
		const status = step.type || step.checkList ? step.status : null;

		switch (status) {
			case CheckListItemStatus.Empty:
				return 'dot-empty';
			case CheckListItemStatus.Completed:
				return 'dot-completed';
			case CheckListItemStatus.InProgress:
				return 'dot-in-progress';
			default:
				return 'dot-hidden';
		}
		// return status === CheckListItemStatus.Empty
		// 	? 'dot-empty'
		// 	: status === CheckListItemStatus.Completed
		// 	? 'dot-completed'
		// 	: status === CheckListItemStatus.InProgress
		// 	? 'dot-in-progress'
		// 	: 'dot-hidden';
	}

	getParentProgress(): any {
		const checkList = this.model!.person.guardianCheckList;
		return {
			status: checkList?.status ?? CheckListItemStatus.Empty,
			progress: checkList?.progress ?? null,
		};
	}

	getPatientSteps(): ICallManagerStep[] {
		const steps: ICallManagerStep[] = [
			{
				id: 'call',
				title: `Call Info`,
				controlType: 'call',
			} as ICallManagerStep,
		];
		const { person } = this.model!;
		const step = {
			id: `patient`,

			controlType: `person-general`,
			test: true,
			title: `${person.firstname} ${person.lastname}`,
			type: CheckListItemType.PersonalInfo,
			person,
			personId: person.id,
			patientId: this.model!.patients[0]!.patient.id,
			patientStatusId: this.model!.patients[0]!.patient.statusId,
			patientAreaId: this.model!.patients[0]!.patient.areaId,
			showPatientStatus: true,
			status: this.model!.patients[0]!.patient.icCheckList?.status ?? CheckListItemStatus.Empty,
			checkList: this.model!.patients[0]!.patient.icCheckList,
		} as ICallManagerStep;
		step.items = this.getPatientCheckListSteps(step)!;
		steps.push(step);
		steps.push(this.getFullReviewStep());
		return this.prepareSteps(steps);
	}

	getInitialSteps(): ICallManagerStep[] {
		const steps: ICallManagerStep[] = [];
		steps.push({
			id: 'call',
			controlType: 'call',
			title: `Call Info`,
			status: CheckListItemStatus.Empty,
			left: 0,
			gotoNext: true,
		} as ICallManagerStep);
		return steps;
	}

	getPatientIndexes(step: ICallManagerStep) {
		const currentIndex = step.controlType.split('-')[1];
		if (currentIndex) {
			return [this.getChildren()[parseInt(currentIndex, 10)].patient];
		}
		return this.getChildren().map((x) => x.patient);
	}

	getPatientTitle(step: ICallManagerStep) {
		const currentIndex = step.controlType.split('-')[1];
		return currentIndex ? step.title : null;
	}

	getChildren(): any[] {
		const children = [];
		let idx = 1;
		this.model!.patients.forEach((p) => {
			children.push({
				title: `Child ${idx++}`,
				patient: p,
				name: `(${p.patient!.person!.firstname} ${p.patient!.person!.lastname})`,
			});
		});
		if (this.model!.requestedPatients) {
			for (let i = 0; i < this.model!.requestedPatients; i++) {
				children.push({
					title: `Child ${idx++}`,
					name: '',
					patient: {
						callId: this.model!.id,
						id: Guid.EMPTY,
						patient: {
							id: Guid.EMPTY,
							person: {
								id: Guid.EMPTY,
								lastname: '',
								firstname: '',
								middlename: '',
								dob: null,
							},
						},
					},
				});
			}
		}

		return children;
	}

	private getFullReviewStep() {
		const completionStep = {
			id: `review`,
			controlType: 'full-review',
			title: 'Review All',
			test: true,
		} as ICallManagerStep;
		return completionStep;
	}

	private getParentSteps(): ICallManagerStep[] {
		const checkList = this.model!.person.guardianCheckList;
		const steps: ICallManagerStep[] = [
			{
				id: 'call',
				title: `Call Info`,
				controlType: 'call',
			} as ICallManagerStep,
		];
		const parentStep = {
			id: 'parent',
			controlType: 'person-general',
			checkList,
			test: true,
			title: `Parent (${this.model!.person.firstname} ${this.model!.person.lastname})`,
			person: this.model!.person,
			personId: this.model!.person.id,
			items: [],
		} as unknown as ICallManagerStep;
		parentStep.items = this.getParentCheckListSteps(parentStep)!;
		steps.push(parentStep);

		parentStep.items.push({
			id: 'children',
			controlType: 'children',
			title: 'Children',
		} as ICallManagerStep);

		this.getChildrenSteps().forEach((s) => steps.push(s));
		steps.push(this.getFullReviewStep());
		return this.prepareSteps(steps);
	}

	private getChildrenSteps() {
		const steps: ICallManagerStep[] = [];
		this.getChildren().forEach((p, index) => {
			const step = {
				id: `child-${index + 1}`,
				controlType: `children-${index}`,
				title: `${p.title} ${p.name}`,
				person: p.patient?.patient?.person,
				personId: p.patient?.patient?.person?.id,
				patientId: p.patient?.patient?.id,
				patientStatusId: p.patient?.patient?.statusId,
				patientAreaId: p.patient?.patient?.areaId,
				showPatientStatus: true,
				status: p.patient?.patient?.icCheckList?.status ?? CheckListItemStatus.Empty,
				checkList: p.patient?.patient?.icCheckList,
			} as ICallManagerStep;

			step.items = this.getPatientCheckListSteps(step)!;
			steps.push(step);
		});
		return steps;
	}

	private getParentCheckListSteps(step: ICallManagerStep) {
		if (!step.checkList) {
			return null;
		}
		const steps = [];
		const ordered = this.getOrderedCheckListItemTypes();
		const items = step.checkList.items.sort(
			(a, b) => ordered.indexOf(a.type) - ordered.indexOf(b.type),
		);
		items.forEach((i, cidx) => {
			const personStep = {
				id: `${step.id}-checklist-${cidx}`,
				controlType: this.getControlType(i.type),
				title: i.typeName,
				test: true,
				person: step.person,
				personId: step.personId,
				checkList: step.checkList,
				type: i.type,
			} as ICallManagerStep;
			if (personStep.type !== CheckListItemType.PersonalInfo) {
				steps.push(personStep);
			}
		});
		const completionStep = {
			id: `${step.id}-review`,
			controlType: 'review',
			title: 'Review',
			test: true,
			person: step.person,
			personId: step.personId,
			patientId: step.patientId,
			checkList: step.checkList,
		} as ICallManagerStep;
		steps.push(completionStep);
		return steps;
	}

	private getPatientCheckListSteps(step: ICallManagerStep) {
		if (!step.checkList) {
			return null;
		}
		const steps = [];
		const ordered = this.getOrderedCheckListItemTypes();
		const items = step.checkList.items.sort(
			(a, b) => ordered.indexOf(a.type) - ordered.indexOf(b.type),
		);
		items.forEach((i, cidx) => {
			const patientStep = {
				id: `${step.id}-checklist-${cidx}`,
				controlType: this.getControlType(i.type),
				title: i.typeName,
				test: true,
				person: step.person,
				personId: step.personId,
				patientId: step.patientId,
				checkList: step.checkList,
				type: i.type,
			} as ICallManagerStep;
			if (
				i.type !== CheckListItemType.GuardianInfo &&
				patientStep.type !== CheckListItemType.PersonalInfo
			) {
				steps.push(patientStep);
			}
		});
		const completionStep = {
			id: `${step.id}-review`,
			controlType: 'review',
			title: 'Review',
			test: true,
			person: step.person,
			personId: step.personId,
			patientId: step.patientId,
			checkList: step.checkList,
		} as ICallManagerStep;
		steps.push(completionStep);
		return steps;
	}

	private getControlType(type: CheckListItemType) {
		switch (type) {
			case CheckListItemType.PersonalInfo:
				return 'person-general';
			case CheckListItemType.Demographic:
				return 'demographic';
			case CheckListItemType.Contacts:
				return 'contacts';
			case CheckListItemType.FormsCompleted:
				return 'forms';
			case CheckListItemType.PatientAvailability:
				return 'availability';
			case CheckListItemType.InsuranceInfo:
			case CheckListItemType.InsuranceVerified:
				return 'insurance';
			case CheckListItemType.IntakeCompleted:
			case CheckListItemType.IntakeScheduled:
				return 'intake-schedule';
			case CheckListItemType.ModalitySelections:
				return 'modality';
			default:
				break;
		}
		return '';
	}

	private prepareSteps(steps: ICallManagerStep[]): ICallManagerStep[] {
		const result: ICallManagerStep[] = [];
		steps.forEach((s) => {
			this.addStep(result, s, 0);
		});
		result.forEach((s, index) => {
			s.back = index === 0 ? null! : result[index - 1]!;
			s.next = index < result.length - 1 ? result[index + 1]! : null!;
		});
		return result;
	}

	private addStep(result: ICallManagerStep[], step: ICallManagerStep, level: number) {
		step.left = level;
		if (step.checkList) {
			if (step.type) {
				const checkListItem = step.checkList.items.filter((i) => i.type === step.type)[0];
				if (checkListItem) {
					step.status = checkListItem.status;
				}
			} else {
				step.status = step.checkList.status;
			}
		}
		result.push(step);
		if (step.items && step.items.length > 0) {
			step.items.forEach((s) => {
				s.parentStepId = step.id;
				this.addStep(result, s, level + 1);
			});
		}
	}

	addPatient() {
		this.suppressMessages = true;

		this.model!.requestedPatients = (this.model!.requestedPatients || 0) + 1;
		this._callService.updateModel(this.model).subscribe(() => {
			this.refresh();
		});
	}

	deletePatient() {
		this.suppressMessages = true;

		if ((this.model!.requestedPatients || 0) > 0) {
			this.model!.requestedPatients = (this.model!.requestedPatients || 0) - 1;
			this._callService.updateModel(this.model).subscribe(() => {
				this.refresh();
			});
		}
	}

	getIntakeGroupTypes() {
		return [FormGroupType.Intake];
	}

	getPatientAvailabilityFilter(step: ICallManagerStep) {
		return {
			personId: step.personId,
			type: PersonAvailabilityType.PatientService,
		} as IPersonAvailabilityFilter;
	}

	getIntakeSchedulePatients(step: ICallManagerStep | null) {
		if (step!.id.startsWith('parent-')) {
			const patientIds = this.model!.patients.map((x) => x.patient.id);
			return patientIds;
		}
		return [step!.patientId];
	}

	getAllReviews(): any[] {
		const list = this.steps.filter((x) => x.controlType === 'review');
		const reviewList = list.map((x) => {
			return {
				title: `${x.person.firstname} ${x.person.lastname}`,
				id: x.checkList?.id,
			};
		});
		// console.log(reviewList);
		return reviewList;
	}

	gotoCheckList(e: any) {
		const step = this.steps.filter(
			(x) => x.checkList?.id === e.checkListId && x.type === e.itemType,
		)[0];
		if (step) {
			this.interStep = step;
			this.beforeNext.next();
			if (this.currentStep?.test === true) {
				this.confirmSave();
			}
		}
	}

	getOrderedCheckListItemTypes() {
		return [
			CheckListItemType.PersonalInfo,
			CheckListItemType.Demographic,
			CheckListItemType.Contacts,
			CheckListItemType.InsuranceInfo,
			CheckListItemType.PaymentInfo,
			CheckListItemType.ModalitySelections,
			CheckListItemType.PatientAvailability,
			CheckListItemType.FormsCompleted,
			CheckListItemType.InsuranceVerified,
			CheckListItemType.IntakeScheduled,
			CheckListItemType.IntakeCompleted,
		];
	}
}
