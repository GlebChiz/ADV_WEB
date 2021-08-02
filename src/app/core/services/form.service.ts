import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services';
import { IPdfDataModel } from '../components/controls/edit_pdffile-control/input';
import { IEditingForm, IFormDataModel, IFormFieldValue, IFormSection } from '../models/form.model';

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

	getForm(id: Guid): Observable<IEditingForm> {
		return this.get(`${id}/get-form`);
	}

	getFormValues(id: Guid): Observable<IFormFieldValue[]> {
		return this.get(`${id}/form-values`);
	}

	saveFormValues(model: IFormDataModel): Observable<any> {
		return this.put('save-form-values', model);
	}

	createForm(model: any): Observable<any> {
		return this.post('create', model);
	}

	savePdfForm(model: IPdfDataModel): Observable<any> {
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

	getFormSection(filter: any): Observable<IFormSection> {
		const filterId = Guid.create();
		return this.saveFilterData('save-filter', filterId, filter).pipe(
			switchMap(() => this.get<IFormSection>(`${filterId}/form-section`)),
		);
	}
}
