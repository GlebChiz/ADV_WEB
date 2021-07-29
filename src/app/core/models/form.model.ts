import { Guid } from 'guid-typescript';

export enum FormPersonRole {
	Patient = 1,
	Clinician = 2,
	Owner = 3,
	Supervisor = 4,
}

export interface FormPerson {
	personId: Guid;
	role: FormPersonRole;
	personName: string;
}

export interface EditingForm {
	id: Guid;
	createdBy: string;
	createdDate: Date;
	updatedBy: string;
	updatedDate: Date;
	isActive: boolean;
	file: PdfFile;
	revision: FormRevision;
	formPersons: FormPerson[];
}

export interface FormRevision {
	id: Guid;
	title: string;
	version: number;
	uploadRule: FormUploadRule;
	uploadMessage: string;
	formServiceName: string;
	effectiveDate: Date;
	definition: FormDefinition;
	editorType: FormEditorType;
	fields: FormField[];
}

export interface FormDefinition {
	id: Guid;
	title: string;
	code: string;
}

export interface PdfFile {
	id: Guid;
	sourceType: PdfSourceType;
	pageCount: number;
	title: string;
	isEditable: boolean;
	uniqueId: string;
	values: PdfFileValue[];
}

export interface PdfFileValue {
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
export interface CreateFormModel {
	revisionId: Guid;
	formPersons: FormPerson[];
}

export enum FormEditorActionType {
	Save = 1,
	Reset = 2,
	Publish = 3,
	Reopen = 4,
}

export interface FormEditorAction {
	form: EditingForm;
	action: FormEditorActionType;
}

export interface FormGroup {
	title: string;
	items: FormGroupItem[];
}

export interface FormGroupItem {
	definition: FormDefinition;
	allowMultiple: boolean;
	isRequired: boolean;
	formTypeId: Guid | null;
	formTypeName: string;
}

export interface FormField {
	id: Guid;
	pageNumber: number | null;
	code: string;
	title: string;
	dataType: FormFieldDataType;
	lookupTypeId: Guid | null;
	customLookupCode: string;
	isRequired: boolean;
}

export interface FormFieldValue {
	id: Guid;
	formField: FormField;
	value: string;
}

export interface FormDataModel {
	formId: Guid;
	values: FormDataItem[];
}
export interface FormDataItem {
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

export interface FormSection {
	groups: FormGroup[];
	forms: EditingForm[];
}
