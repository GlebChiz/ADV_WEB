import { IPayerType } from 'src/app/shared/interfaces/payer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PayerService {
	public constructor(private http: HttpClient) {}

	public getTypes(): Observable<IPayerType[]> {
		return this.http.get<IPayerType[]>('dropdowns/PayerType');
	}
}
