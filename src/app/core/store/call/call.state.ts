import { Call } from '../../models/call.model';

export interface ICallState {
	call: Call | null;
	activeCall: Call | null;
}

export const initialCallState: ICallState = {
	call: null,
	activeCall: null,
};
