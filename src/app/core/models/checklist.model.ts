import { Guid } from 'guid-typescript';
import { CheckListType, CheckListItemType, CheckListItemStatus } from '../enums/checklist.types';

export interface ICheckList {
	id: Guid;
	checkListType: CheckListType;
	personId: Guid;
	name: string;
	items: ICheckListItem[];
	status: CheckListItemStatus;
	progress: number | null;
	statusName: string;
	context: IChecklistContext | null;
	review: ICheckListReviewGroup[];
}

export interface ICheckListItem {
	id: Guid;
	type: CheckListItemType;
	status: CheckListItemStatus;
	checkListId: Guid;
	typeName: string;
	statusName: string;
}

export interface ICheckListReviewGroup {
	title: string;
	itemType: CheckListItemType;
	listType: CheckListType;
	status: CheckListItemStatus;
	items: ICheckListReviewItem[];
}
export interface ICheckListReviewItem {
	title: string;
	value: string;
	status: CheckListItemStatus;
}

export interface IChecklistContext {
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
