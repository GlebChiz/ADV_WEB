import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Observable, throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export abstract class DataService {
	constructor(private http: HttpClient, protected controller: string) {}

	protected getUrl(controller: string) {
		return `${environment.apiUrl}/${controller}`;
	}

	getWithController<T>(
		controller: string,
		action?: string,
		params: HttpParams = new HttpParams(),
	): Observable<T> {
		const options = {
			params,
		};
		const url = this.getUrl(controller);
		return this.http.get<T>(`${url}/${action || ''}`, options).pipe(catchError(this.formatErrors));
	}

	get<T>(action?: string, params: HttpParams = new HttpParams()): Observable<T> {
		return this.getWithController<T>(this.controller, action, params);
	}

	post<T>(action?: string, body: Object = {}, additionalOptions: Object = {}): Observable<any> {
		return this.postWithController<T>(this.controller, action, body, additionalOptions);
	}

	postWithController<T>(
		controller: string,
		action?: string,
		body: Object = {},
		additionalOptions: Object = {},
	): Observable<T> {
		if (additionalOptions) {
			return this.http
				.post<T>(`${this.getUrl(controller)}/${action || ''}`, body, additionalOptions)
				.pipe(catchError(this.formatErrors));
		}
		return this.http
			.post<T>(`${this.getUrl(controller)}/${action || ''}`, body)
			.pipe(catchError(this.formatErrors));
	}

	put<T>(action?: string, body: Object = {}): Observable<T> {
		return this.http
			.put<T>(`${this.getUrl(this.controller)}/${action || ''}`, body)
			.pipe(catchError(this.formatErrors));
	}

	delete<T>(action?: string, params: HttpParams = new HttpParams()): Observable<T> {
		const options = {
			params,
		};
		return this.http
			.delete<T>(`${this.getUrl(this.controller)}/${action || ''}`, options)
			.pipe(catchError(this.formatErrors));
	}

	protected downloadFile(
		action?: string,
		body: any = null,
		fileType: string = 'application/pdf',
	): Observable<HttpResponse<Blob>> {
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

	protected saveFilterData<T>(action: string, filterId: Guid, filterModel: any): Observable<T> {
		const data = {
			...filterModel,
			FilterId: filterId.toString(),
		};
		return this.post<T>(action, data);
	}

	getModel<T>(id: Guid | null): Observable<T> {
		return this.get<T>(`${id || Guid.EMPTY}`);
	}

	updateModel<T>(model: any): Observable<any> {
		return this.post<T>('update', model);
	}

	createModel<T>(model: any): Observable<T> {
		return this.put<T>('create', model);
	}

	deleteModel<T>(id: Guid): Observable<T> {
		return this.delete<T>(`${id}/delete`);
	}
}
