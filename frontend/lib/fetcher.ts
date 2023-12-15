export default function fetcher(
	url: string,
	data = undefined,
	method: string | undefined = undefined
) {
	return fetch(`http://localhost:5001/${url}`, {
		method: method ? method : "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.status > 299 && res.status < 200) {
			throw new Error();
		}
		return res.json();
	});
}
