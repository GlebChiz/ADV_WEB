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

export interface IDropDownGridSettings {
	id: string;
	title: string;
	isDefault: boolean;
}
