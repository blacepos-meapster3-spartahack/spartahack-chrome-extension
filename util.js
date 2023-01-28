
/// modified version of `fetch` with specific options for json
export async function fetchJson(resource, options) {
	return await fetch(
		resource,
		{
			...options,
			method: "GET",
			headers: [
				["Accept", "application/json"]
			]
		}
	);
}
