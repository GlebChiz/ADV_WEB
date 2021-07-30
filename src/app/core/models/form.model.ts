import { Guid } from 'guid-typescript';

export enum FormPersonRole {
	Patient = 1,
	Clinician = 2,
	Owner = 3,
	Supervisor = 4,
}

export interface IFormPerson {
	personId: Guid;
	role: FormPersonRole;
	personName: string;
}

export interface IEditingForm {
	id: Guid;
	createdBy: string;
	createdDate: Date;
	updatedBy: string;
	updatedDate: Date;
	isActive: boolean;
	file: IPdfFile;
	revision: IFormRevision;
	formPersons: IFormPerson[];
}

export interface IFormRevision {
	id: Guid;
	title: string;
	version: number;
	uploadRule: FormUploadRule;
	uploadMessage: string;
	formServiceName: string;
	effectiveDate: Date;
	definition: IFormDefinition;
	editorType: FormEditorType;
	fields: IFormField[];
}

export interface IFormDefinition {
	id: Guid;
	title: string;
	code: string;
}

export interface IPdfFile {
	id: Guid;
	sourceType: PdfSourceType;
	pageCount: number;
	title: string;
	isEditable: boolean;
	uniqueId: string;
	values: IPdfFileValue[];
}

export interface IPdfFileValue {
	id: Guid;
	fieldName: string;
	value: string;
	pageNumber: number;
}

export enum PdfSourceType {
	Uploaded = 1,
	TemplateCopied = 2,
	PublishedForm = 3,
}

export enum FormUploadRule {
	None = 0,
	Single = 1,
	Combine = 2,
	Append = 3,
}

export enum FormEditorType {
	None = 0,
	PdfEditor = 1,
}
export interface ICreateFormModel {
	revisionId: Guid;
	formPersons: IFormPerson[];
}

export enum FormEditorActionType {
	Save = 1,
	Reset = 2,
	Publish = 3,
	Reopen = 4,
}

export interface IFormEditorAction {
	form: IEditingForm;
	action: FormEditorActionType;
}

export interface IFormGroup {
	title: string;
	items: IFormGroupItem[];
}

export interface IFormGroupItem {
	definition: IFormDefinition;
	allowMultiple: boolean;
	isRequired: boolean;
	formTypeId: Guid | null;
	formTypeName: string;
}

export interface IFormField {
	id: Guid;
	pageNumber: number | null;
	code: string;
	title: string;
	dataType: FormFieldDataType;
	lookupTypeId: Guid | null;
	customLookupCode: string;
	isRequired: boolean;
}

export interface IFormFieldValue {
	id: Guid;
	formField: IFormField;
	value: string;
}

export interface IFormDataModel {
	formId: Guid;
	values: IFormDataItem[];
}
export interface IFormDataItem {
	fieldId: string;
	value: string;
}

export enum FormFieldDataType {
	Unspecified = 0,
	Text = 1,
	Lookup = 2,
	CustomLookup = 3,
	Date = 4,
	Boolean = 5,
	Integer = 6,
	Signature = 7,
}

export enum FormGroupType {
	Intake = 1,
}

export interface IFormSection {
	groups: IFormGroup[];
	forms: IEditingForm[];
}
