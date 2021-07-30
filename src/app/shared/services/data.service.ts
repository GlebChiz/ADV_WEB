import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Observable, throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export abstract class DataService {
	constructor(private http: HttpClient, protected controller: string) {}

	protected getUrl(controller: string) {
		return `${environment.apiUrl}/${controller}`;
	}

	getWithController(
		controller: string,
		action?: string,
		params: HttpParams = new HttpParams(),
	): Observable<any> {
		const options = {
			params,
		};
		const url = this.getUrl(controller);
		return this.http.get(`${url}/${action || ''}`, options).pipe(catchError(this.formatErrors));
	}

	get(action?: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this.getWithController(this.controller, action, params);
	}

	post(action?: string, body: Object = {}, additionalOptions: Object = {}): Observable<any> {
		return this.postWithController(this.controller, action, body, additionalOptions);
	}

	postWithController(
		controller: string,
		action?: string,
		body: Object = {},
		additionalOptions: Object = {},
	): Observable<any> {
		if (additionalOptions) {
			return this.http
				.post(`${this.getUrl(controller)}/${action || ''}`, body, additionalOptions)
				.pipe(catchError(this.formatErrors));
		}
		return this.http
			.post(`${this.getUrl(controller)}/${action || ''}`, body)
			.pipe(catchError(this.formatErrors));
	}

	put(action?: string, body: Object = {}): Observable<any> {
		return this.http
			.put(`${this.getUrl(this.controller)}/${action || ''}`, body)
			.pipe(catchError(this.formatErrors));
	}

	delete(action?: string, params: HttpParams = new HttpParams()): Observable<any> {
		const options = {
			params,
		};
		return this.http
			.delete(`${this.getUrl(this.controller)}/${action || ''}`, options)
			.pipe(catchError(this.formatErrors));
	}

	protected downloadFile(
		action?: string,
		body: any = null,
		fileType: string = 'application/pdf',
	): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set('Accept', fileType);

		return this.http
			.post(`${this.getUrl(this.controller)}/${action || ''}`, body, {
				observe: 'response',
				headers,
				responseType: 'blob',
			})
			.pipe(catchError(this.formatErrors));
	}

	protected formatErrors(error: any): Observable<never> {
		if (error.status === 401) {
			window.location.href = environment.apiUrl;
		}
		if (error.error) {
			error.error.status = error.status;
			return throwError(error.error);
		}
		return of();
	}

	protected saveFilterData(action: string, filterId: Guid, filterModel: any): Observable<any> {
		const data = {
			...filterModel,
			FilterId: filterId.toString(),
		};
		return this.post(action, data);
	}

	getModel(id: Guid | null): Observable<any> {
		return this.get(`${id || Guid.EMPTY}`);
	}

	updateModel(model: any): Observable<any> {
		return this.post('update', model);
	}

	createModel(model: any): Observable<any> {
		return this.put('create', model);
	}

	deleteModel(id: Guid): Observable<any> {
		return this.delete(`${id}/delete`);
	}
}
