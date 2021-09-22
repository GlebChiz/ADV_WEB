export function removeTimezone(value: Date): Date {
	const date: Date = new Date(value);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date;
}

export function addTimezone(value: Date): Date {
	const date: Date = new Date(value);
	date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
	return date;
}
