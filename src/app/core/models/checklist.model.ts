import { Guid } from 'guid-typescript';
import { CheckListType, CheckListItemType, CheckListItemStatus } from '../enums/checklist.types';

export interface CheckList {
	id: Guid;
	checkListType: CheckListType;
	personId: Guid;
	name: string;
	items: CheckListItem[];
	status: CheckListItemStatus;
	progress: number | null;
	statusName: string;
	context: ChecklistContext | null;
	review: CheckListReviewGroup[];
}

export interface CheckListItem {
	id: Guid;
	type: CheckListItemType;
	status: CheckListItemStatus;
	checkListId: Guid;
	typeName: string;
	statusName: string;
}

export interface CheckListReviewGroup {
	title: string;
	itemType: CheckListItemType;
	listType: CheckListType;
	status: CheckListItemStatus;
	items: CheckListReviewItem[];
}
export interface CheckListReviewItem {
	title: string;
	value: string;
	status: CheckListItemStatus;
}

export interface ChecklistContext {
	patientId: Guid | null;
}
export function checkListClassName(status: CheckListItemStatus) {
	switch (status) {
		case CheckListItemStatus.Completed:
			return 'checklist-completed';
		case CheckListItemStatus.Empty:
			return 'checklist-empty';
		case CheckListItemStatus.InProgress:
			return 'checklist-in-progress';
		default:
			return '';
	}
}
