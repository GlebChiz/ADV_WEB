import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services';
import { PdfDataModel } from '../components/controls/edit_pdffile-control/input';
import { EditingForm, FormDataModel, FormFieldValue, FormSection } from '../models/form.model';

@Injectable({ providedIn: 'root' })
export class FormService extends DataService {
	constructor(http: HttpClient) {
		super(http, 'form');
	}

	uploadFile(formData: FormData): Observable<any> {
		return this.post('upload-file', formData);
	}

	uploadForm(model: any): Observable<any> {
		return this.post('upload', model);
	}

	unpublish(formId: Guid): Observable<any> {
		return this.post(`${formId}/unpublish`);
	}

	removeFile(uid: string): Observable<any> {
		return this.post('remove-file', uid);
	}

	getBase64Pdf(pdfFileId: Guid): Observable<string[]> {
		return this.get(`${pdfFileId}/get-base64-pdf`);
	}

	getPdfFile(pdfFileId: Guid): Observable<any> {
		return this.downloadFile(`${pdfFileId}/get-pdf-file`);
	}

	getPdfFileUrl(pdfFileId: Guid): string {
		return `${this.getUrl(this.controller)}/${pdfFileId}/get-pdf`;
	}

	getPdfTemplate(revisionId: Guid): Observable<any> {
		return this.downloadFile(`${revisionId}/get-pdf-template`);
	}

	getPdfTemplatePageCount(revisionId: Guid): Observable<number> {
		return this.get(`${revisionId}/pdf-template-page-count`);
	}

	getForm(id: Guid): Observable<EditingForm> {
		return this.get(`${id}/get-form`);
	}

	getFormValues(id: Guid): Observable<FormFieldValue[]> {
		return this.get(`${id}/form-values`);
	}

	saveFormValues(model: FormDataModel): Observable<any> {
		return this.put('save-form-values', model);
	}

	createForm(model: any): Observable<any> {
		return this.post('create', model);
	}

	savePdfForm(model: PdfDataModel): Observable<any> {
		return this.put('save-pdf-form', model);
	}

	resetForm(formId: Guid): Observable<any> {
		return this.put(`${formId}/reset-form`);
	}

	publishForm(formId: Guid): Observable<any> {
		return this.put(`${formId}/publish-form`);
	}

	reopenForm(formId: Guid): Observable<any> {
		return this.put(`${formId}/reopen-form`);
	}

	getFormSection(filter: any): Observable<FormSection> {
		const filterId = Guid.create();
		return this.saveFilterData('save-filter', filterId, filter).pipe(
			switchMap((response) => this.get(`${filterId}/form-section`)),
		);
	}
}
