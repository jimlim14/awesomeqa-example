import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDateDistance = (timestamp: string) => {
	const date = parseISO(timestamp);

	const distance = formatDistanceToNow(date);

	return `${distance} ago`;
};
