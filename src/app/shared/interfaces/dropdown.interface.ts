export interface IDropdownData {
	id: string;
	name: string;
	isDisabled: boolean;
	parentId?: string;
}

export interface IDropDownState {
	data: IDropdownData[];
	isLoading: boolean;
}
