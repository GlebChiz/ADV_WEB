import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PayerService {
	public constructor(private http: HttpClient) {}

	public getTypes(): Observable<any> {
		return this.http.get('dropdowns/PayerType');
		// return this.http.post('create', user);
	}
}
