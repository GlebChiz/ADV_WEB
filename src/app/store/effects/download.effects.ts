// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, mergeMap, switchMap } from 'rxjs/operators';
// import { IDownload } from 'src/app/shared/interfaces/download.interface';
// import { DownloadFileService } from 'src/app/shared/services/download.service';
// // import { environment } from 'src/environments/environment';
// import { DownloadFileActions } from '../actions/download.actions';

// @Injectable()
// export class DownloadFileEffects {
// 	public constructor(private actions$: Actions, private _downloadService: DownloadFileService) {}

// 	public downloadFile$ = createEffect(() => {
// 		return this.actions$.pipe(
// 			ofType(DownloadFileActions.DownloadFilePending),
// 			switchMap(() => {
// 				return this._downloadService.downloadFile().pipe(
// 					switchMap((item: IDownload) => {
// 						// const a: HTMLAnchorElement = document.createElement('a');
// 						// a.download = `${item.fileName}`;
// 						// a.href = `${environment.apiUrl}/content/download-report-async/${item.fileId}`;
// 						// a.click();
// 						return this._downloadService.getDownloadFileAsync(item.fileId).pipe(
// 							mergeMap(() => {
// 								return [DownloadFileActions.GetDownloadFileAsyncSuccess()];
// 							}),
// 							catchError((error: any) => {
// 								console.log(error);
// 								return of(DownloadFileActions.GetDownloadFileAsyncError());
// 							}),
// 						);
// 					}),
// 				);
// 			}),
// 		);
// 	});
// }
