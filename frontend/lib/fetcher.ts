export default async function fetcher(
	url: string,
	data = undefined,
	method: string | undefined = undefined
) {
	try {
		const res = await fetch(`http://localhost:5001/${url}`, {
			method: method ? method : "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			throw new Error("Request failed");
		}
		return {
			data: await res.json(),
			error: undefined,
		};
	} catch (e) {
		return {
			data: undefined,
			error: e.message || "Something went wrong",
		};
	}
}
