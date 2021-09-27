import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IDownload } from '../interfaces/download.interface';

@Injectable({ providedIn: 'root' })
export class DownloadFileService {
	public constructor(private http: HttpClient) {}

	public downloadFile(): Observable<IDownload> {
		return this.http.post<IDownload>('content/billing-report', {});
	}

	// public getDownloadFile(fileId: string): Observable<IDownload> {
	// 	return this.http.get<IDownload>(`content/download-report/${fileId}`);
	// }

	public getDownloadFileAsync(fileId: IDownload): Observable<IDownload> {
		return this.http.get<IDownload>(`content/download-report-async/${fileId}`);
	}
}
