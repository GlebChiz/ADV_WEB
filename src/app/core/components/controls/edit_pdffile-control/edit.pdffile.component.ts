import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import {
	EditingForm,
	FormDataItem,
	FormDataModel,
	FormEditorAction,
	FormEditorActionType,
	FormFieldDataType,
	FormFieldValue,
	PdfFile,
} from 'src/app/core/models/form.model';
import { FormEditorService } from 'src/app/core/services/form.editor.service';
import { FormService } from 'src/app/core/services/form.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { PDFDocumentProxy, PDFPageProxy } from 'ng2-pdf-viewer';
// import { PDFAnnotationData } from 'pdfjs-dist';
import { PdfInput, PdfPage } from './input';

@Component({
	providers: [],
	selector: 'advenium-edit-pdffile',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './edit.pdffile.component.html',
	styleUrls: ['./edit.pdffile.component.scss'],
})
export class EditPdfFileComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	file!: PdfFile;

	@Input() form!: EditingForm;

	data!: string;

	zoom = 1;

	readonly dpiRatio = 96 / 72;

	pages: PdfPage[] | null = null;

	isLoadCompleted = false;

	isLoadInProgress = false;

	signItem: PdfInput | null = null;

	changed() {
		this.formEditorService.changed = true;
	}

	@Input() set formAction(action: FormEditorAction) {
		if (action) {
			switch (action.action) {
				case FormEditorActionType.Save:
					this.saveForm(action.form);
					break;
				case FormEditorActionType.Reset:
					this.resetForm(action.form);
					break;
				case FormEditorActionType.Publish:
					this.publishForm(action.form);
					break;
			}
		}
	}

	@Input() set reset(form: EditingForm) {
		this.resetForm(form);
	}

	constructor(
		private formEditorService: FormEditorService,
		private formService: FormService,
		public validationService: ValidationMessageService,
	) {}

	getField(pageNumber: number, code: string): FormFieldValue {
		return this.pages![pageNumber - 1]!.fields[code];
	}

	private createInput(annotation: any, page: any) {
		const rect = page
			.getViewport({ scale: this.dpiRatio })
			.convertToViewportRectangle(annotation.rect);

		const input = new PdfInput();
		input.name = annotation.fieldName;
		input.pageNumber = page.pageNumber;
		const field = this.getField(input.pageNumber, input.name);
		input.fieldName = field.formField.id.toString();
		input.value = this.parseFormValue(field);
		if (rect) {
			const width = page.view[2] * 1.015;
			const height = page.view[3];
			const left = 0.58;
			const top = 0;
			input.top = rect[3];
			input.left = rect[0];
			input.height = rect[1] - rect[3];
			input.width = rect[2] - rect[0];
			input.pTop = top + (100 * (height - annotation.rect[3])) / height;
			input.pLeft = left + (100 * annotation.rect[0]) / width;
			input.pWidth = (100 * (annotation.rect[2] - annotation.rect[0])) / width;
			input.pHeight = (100 * (annotation.rect[3] - annotation.rect[1])) / height;
		}

		if (annotation.fieldType === 'Sig') {
			input.type = 'sign';
		}
		if (annotation.fieldType === 'Tx') {
			input.type = 'text';
		}

		if (annotation.fieldType === 'Btn' && annotation.radioButton === true) {
			input.type = 'radio';
			input.pWidth *= 2;
			input.pHeight *= 2;
			input.pTop -= input.pHeight / 3;
			input.pLeft -= input.pWidth / 4;
		}
		if (annotation.checkBox === true) {
			input.type = 'checkbox';
			input.value = input.value === 'true';
			input.pWidth *= 2;
			input.pHeight *= 2;
			input.pTop -= input.pHeight / 3;
			input.pLeft -= input.pWidth / 4;
		}

		this.pages![page.pageNumber - 1]!.inputs.push(input);
		return input;
	}

	openSignature(input: PdfInput) {
		this.signItem = input;
		return false;
	}

	parseFormValue(item: FormFieldValue): string {
		switch (item.formField.dataType) {
			case FormFieldDataType.Boolean:
				return item.value === 'true' || item.value === '1' ? 'true' : 'false';
			default:
				return item.value;
		}
	}

	ngOnInit(): void {
		if (this.form) {
			combineLatest([
				this.formService.getPdfTemplate(this.form.revision.id),
				this.formService.getPdfTemplatePageCount(this.form.revision.id),
				this.formService.getFormValues(this.form.id),
			]).subscribe(([xPdf, xPages, xValues]) => {
				this.data = window.URL.createObjectURL(xPdf.body);
				this.pages = Array(xPages)
					.fill(0)
					.map((x, i) => {
						const page = {
							pageNumber: i + 1,
							inputs: [],
							fields: {},
							completed: false,
						} as PdfPage;
						this.form.revision.fields.forEach((f) => {
							page.fields[f.code] = {
								formField: f,
								value: '',
							};
						});
						xValues.forEach((v) => {
							if (v.formField.pageNumber === i + 1) {
								page.fields[v.formField.code].value = v.value;
							}
						});
						return page;
					});
			});
		}
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	private resetForm(form: EditingForm) {
		if (!form) {
			return;
		}
		this.formService.resetForm(form.id).subscribe((response) => {
			this.validationService.displayResponse(response);
			this.formEditorService.reload();
		});
	}

	private publishForm(form: EditingForm) {
		if (!form) {
			return;
		}
		this.formService.publishForm(form.id).subscribe((response) => {
			this.validationService.displayResponse(response);
			this.formEditorService.reload();
		});
	}

	private saveForm(form: EditingForm) {
		if (!form) {
			return;
		}
		const formDataModel: FormDataModel = {
			formId: form.id,
			values: [],
		};
		this.pages!.forEach((p) => {
			p.inputs.forEach((i) => {
				if (i.type === 'sign') {
					const u = 0;
				}
				formDataModel.values.push({
					fieldId: i.fieldName,
					value: i.value,
				} as FormDataItem);
			});
		});
		this.formService.saveFormValues(formDataModel).subscribe((response) => {
			this.validationService.displayResponse(response);
			this.formEditorService.reload();
		});
	}

	getInputPosition(input: PdfInput, container: any): any {
		return {
			top: `${input.pTop * this.zoom}%`,
			left: `${input.pLeft * this.zoom}%`,
			height: `${input.pHeight * this.zoom}%`,
			width: `${input.pWidth * this.zoom}%`,
			position: 'absolute',
			background: '#dde4ff',
			'font-size': `${(1.5 * container.offsetWidth) / 100}px`,
			'z-index': 100,
		};
	}

	getSignPosition(input: PdfInput, container: any): any {
		return {
			height: `100%`,
		};
	}

	saveSignature(signature: any) {
		if (this.signItem) {
			this.signItem.value = signature.signature;
			this.signItem.imageWidth = signature.width;
			this.signItem.imageHeight = signature.height;
			this.changed();
			this.signItem = null;
		}
	}

	getContainerStyle(pageNumber: number) {
		return {
			width: `${100 * this.zoom}%`,
			position: 'relative',
			border: this.pages![pageNumber - 1]!.completed === true ? '1px solid cadetblue' : '0px',
			padding: '0px',
		};
	}

	isCompleted() {
		return this.pages && this.pages.filter((p) => p.completed !== true).length === 0;
	}

	getInputs(page: number) {
		return this.pages![page - 1]!.inputs.filter((i) => i.type === 'text');
	}

	getCheckboxes(page: number) {
		return this.pages![page - 1]!.inputs.filter((i) => i.type === 'checkbox');
	}

	getSignatures(page: number) {
		return this.pages![page - 1]!.inputs.filter((i) => i.type === 'sign');
	}

	getSignature(input: PdfInput) {
		return input.value;
	}

	loadComplete(pdf: PDFDocumentProxy, pageNumber: number): void {
		this.pages![pageNumber - 1]!.completed = true;
		// track the current page
		let currentPage: PDFPageProxy;
		pdf
			.getPage(pageNumber)
			.then((p) => {
				currentPage = p;
				// get the annotations of the current page
				return p.getAnnotations();
			})
			.then((ann) => {
				// ugly cast due to missing typescript definitions
				// please contribute to complete @types/pdfjs-dist
				const annotations = (<any>ann) as PDFAnnotationData[];

				annotations
					.filter((a) => a.subtype === 'Widget') // get the form field annotation only
					.forEach((a) => {
						this.createInput(a, currentPage);
					});
			});
	}
}
