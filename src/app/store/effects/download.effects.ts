// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { IDownload } from 'src/app/shared/interfaces/download.interface';
// import { DownloadFileService } from 'src/app/shared/services/download.service';
// import { DownloadFileActions } from '../actions/download.actions';

// @Injectable()
// export class DownloadFileEffects {
// 	public constructor(private actions$: Actions, private _downloadService: DownloadFileService) {}

// 	public downloadFile$ = createEffect(() => {
// 		return this.actions$.pipe(
// 			ofType(DownloadFileActions.DownloadFilePending),
// 			switchMap(() => {
// 				return this._downloadService.downloadFile().subscribe(
// 					(item: IDownload) => {
// 						return DownloadFileActions.GetDownloadFileAsyncPending(item);
// 					},
// 					catchError((error: any) => {
// 						console.log(error);
// 						return of(DownloadFileActions.DownloadFileError());
// 					}),
// 				);
// 			}),
// 		);
// 	});
// }
