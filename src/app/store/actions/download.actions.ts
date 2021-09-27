import { createAction, props } from '@ngrx/store';

export const DownloadFileActions = {
	DownloadFilePending: createAction('[DownloadFile] DownloadFile pending'),
	DownloadFileError: createAction('[DownloadFile] DownloadFile error'),
	DownloadFileSuccess: createAction('[DownloadFile] DownloadFile success'),

	GetDownloadFilePending: createAction(
		'[DownloadFile]Get DownloadFile pending',
		props<{ fileId: string; fileName: string }>(),
	),
	GetDownloadFileError: createAction('[DownloadFile]Get DownloadFile error'),
	GetDownloadFileSuccess: createAction('[DownloadFile]Get DownloadFile success'),

	GetDownloadFileAsyncPending: createAction(
		'[DownloadFile]Get DownloadFile pending',
		props<{ fileId: string; fileName: string }>(),
	),
	GetDownloadFileAsyncError: createAction('[DownloadFile]Get DownloadFile error'),
	GetDownloadFileAsyncSuccess: createAction('[DownloadFile]Get DownloadFile success'),
};
