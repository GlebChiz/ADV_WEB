import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { IService } from '../../models/service.model';

export const ServiceActions = {
	SetService: createAction('[Service] Set service', props<{ id: Guid; service: IService }>()),
};
