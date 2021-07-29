import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Service } from '../../models/service.model';

export const ServiceActions = {
	SetService: createAction('[Service] Set service', props<{ id: Guid; service: Service }>()),
};
