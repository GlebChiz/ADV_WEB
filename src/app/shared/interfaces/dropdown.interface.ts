export interface IDropdownData {
	id: string;
	name: string;
	isDisabled: boolean;
	parentId?: string;
}

export interface IDropDownState extends IDropDownItem {
	[key: string]: any;
}

interface IDropDownItem {
	isLoading: boolean;
}
