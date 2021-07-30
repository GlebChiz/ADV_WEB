import { ICall } from 'src/app/core/models/call.model';
import { IInsurance } from 'src/app/core/models/insurance.model';
import { IPerson } from 'src/app/core/models/person.model';

export interface ICallEditorModel {
	isSaved: boolean;
	call: ICall;
	person: IPerson;
	primaryInsurance: IInsurance;
}
