import { Call } from 'src/app/core/models/call.model';
import { Insurance } from 'src/app/core/models/insurance.model';
import { Person } from 'src/app/core/models/person.model';

export interface CallEditorModel {
	isSaved: boolean;
	call: Call;
	person: Person;
	primaryInsurance: Insurance;
}
