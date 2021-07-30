import { ICall } from '../../models/call.model';

export interface ICallState {
	call: ICall | null;
	activeCall: ICall | null;
}

export const initialCallState: ICallState = {
	call: null,
	activeCall: null,
};
