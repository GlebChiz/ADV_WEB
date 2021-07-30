import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { CheckListItemStatus } from 'src/app/core/enums/checklist.types';
import { ICheckList, ICheckListReviewGroup } from 'src/app/core/models/checklist.model';
import { CallService } from 'src/app/core/services/call.service';

@Component({
	providers: [],
	selector: 'advenium-checklist-review',
	templateUrl: './checklist-review.component.html',
})
export class ChecklistReviewComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() id!: Guid | null;

	@Output() edit: EventEmitter<any> = new EventEmitter();

	checkList!: ICheckList;

	constructor(
		// private _store: Store<IAppState>,
		private _callService: CallService,
	) {}

	ngOnInit(): void {
		this._callService.getChecklist(this.id!).subscribe((x) => {
			this.checkList = x;
		});
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	getStatusClassName(status: CheckListItemStatus) {
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

	onEdit(e: any, reviewGroup: ICheckListReviewGroup) {
		e.preventDefault();
		this.edit.emit({
			checkListId: this.id,
			itemType: reviewGroup.itemType,
		});
	}
}
