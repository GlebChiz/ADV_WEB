import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { CheckListItemStatus } from 'src/app/core/enums/checklist.types';
import { CheckList, CheckListReviewGroup } from 'src/app/core/models/checklist.model';
import { CallService } from 'src/app/core/services/call.service';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	providers: [],
	selector: 'advenium-checklist-review',
	templateUrl: './checklist-review.component.html',
})
export class ChecklistReviewComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	@Input() id!: Guid;

	@Output() edit: EventEmitter<any> = new EventEmitter();

	checkList!: CheckList;

	constructor(private _store: Store<IAppState>, private _callService: CallService) {}

	ngOnInit(): void {
		this._callService.getChecklist(this.id).subscribe((x) => {
			this.checkList = x;
		});
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	getStatusClassName(status: CheckListItemStatus) {
		return status === CheckListItemStatus.Empty
			? 'dot-empty'
			: status === CheckListItemStatus.Completed
			? 'dot-completed'
			: status === CheckListItemStatus.InProgress
			? 'dot-in-progress'
			: 'dot-hidden';
	}

	onEdit(e: any, reviewGroup: CheckListReviewGroup) {
		e.preventDefault();
		this.edit.emit({
			checkListId: this.id,
			itemType: reviewGroup.itemType,
		});
	}
}
