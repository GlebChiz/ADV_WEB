import { Guid } from 'guid-typescript';
import { IPdfFileValue } from 'src/app/core/models/form.model';

export class PdfInput {
	name!: string;

	type!: string; // bind this in HTML when this issue will be fixed https://github.com/angular/angular/issues/13243

	top!: number;

	left!: number;

	width!: number;

	height!: number;

	value!: any;

	pageNumber!: number;

	pLeft!: number;

	pTop!: number;

	pWidth!: number;

	pHeight!: number;

	fieldName!: string;

	checked!: string;

	imageWidth!: number;

	imageHeight!: number;
}

export interface PdfPage {
	inputs: PdfInput[];
	pageNumber: number;
	completed: boolean;
	fields: any;
}

export interface PdfDataModel {
	formId: Guid;
	values: IPdfFileValue[];
}
