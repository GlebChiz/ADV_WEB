export function removeTimezone(value: Date) {
	const date = new Date(value);
	date.setMinutes(date.getMinutes() - new Date().getTimezoneOffset());
	return date;
}

export function addTimezone(value: Date) {
	const date = new Date(value);
	date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
	return date;
}

export function fixDate(value: any, field: string) {
	if (value[field] && typeof value[field] === 'string') {
		value[field] = new Date(value[field]);
	}
}
