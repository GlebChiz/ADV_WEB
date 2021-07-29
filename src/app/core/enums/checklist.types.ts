export enum CheckListType {
	PendingIntakeCoordination = 1,
	Guardian = 2,
}

export enum CheckListItemType {
	Demographic = 1,
	GuardianInfo = 2,
	InsuranceInfo = 3,
	PaymentInfo = 4,
	ModalitySelections = 5,
	PatientAvailability = 6,
	FormsCompleted = 7,
	InsuranceVerified = 8,
	IntakeScheduled = 9,
	IntakeCompleted = 10,
	PersonalInfo = 11,
	Contacts = 12,
}

export enum CheckListItemStatus {
	Empty = 0,
	InProgress = 1,
	Completed = 2,
}
