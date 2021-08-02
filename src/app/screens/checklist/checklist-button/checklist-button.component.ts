import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
	CheckListItemStatus,
	CheckListItemType,
	CheckListType,
} from 'src/app/core/enums/checklist.types';
import { ICheckList, checkListClassName } from 'src/app/core/models/checklist.model';

@Component({
	providers: [],
	selector: 'advenium-checklist-button',
	templateUrl: './checklist-button.component.html',
})
export class ChecklistButtonComponent implements OnDestroy {
	private _destroy$ = new Subject();

	@Input() checklist!: ICheckList;

	constructor(
		// private _store: Store<IAppState>,
		private router: Router,
	) {}

	// ngOnInit(): void {}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	checkListClass(status: CheckListItemStatus): string {
		return checkListClassName(status);
	}

	onItemClick(e: any): void {
		switch (this.checklist.checkListType) {
			case CheckListType.PendingIntakeCoordination:
				switch (e.type) {
					case CheckListItemType.Demographic:
						this.router.navigate(['/patient', this.checklist.context!.patientId]);
						break;
					case CheckListItemType.GuardianInfo:
						break;
					case CheckListItemType.FormsCompleted:
						break;
					case CheckListItemType.PatientAvailability:
						break;
					case CheckListItemType.InsuranceInfo:
						this.router.navigate(['/patient', this.checklist.context!.patientId]);
						break;
					case CheckListItemType.InsuranceVerified:
						this.router.navigate(['/patient', this.checklist.context!.patientId]);
						break;
					case CheckListItemType.IntakeCompleted:
						this.router.navigate([`/patient`, this.checklist.context!.patientId], {
							fragment: 'intake',
						});
						break;
					case CheckListItemType.IntakeScheduled:
						this.router.navigate([`/patient`, this.checklist.context!.patientId], {
							fragment: 'intake',
						});
						break;
					case CheckListItemType.ModalitySelections:
						this.router.navigate(['/patient', this.checklist.context!.patientId]);
						break;
					case CheckListItemType.PaymentInfo:
						break;
					default:
						break;
				}
				break;
			case CheckListType.Guardian:
				switch (e.type) {
					case CheckListItemType.Demographic:
						this.router.navigate(['/person', this.checklist.personId]);
						break;
					case CheckListItemType.IntakeCompleted:
						this.router.navigate([`/person`, this.checklist.personId], { fragment: 'intake' });
						break;
					case CheckListItemType.IntakeScheduled:
						this.router.navigate([`/person`, this.checklist.personId], { fragment: 'intake' });
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}
}
