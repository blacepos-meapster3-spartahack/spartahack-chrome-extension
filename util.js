
// TODO: move environment variables to .env (can dotenvy be used here? it's npm)
const AUTONOTE_ADDRESS = "http://35.245.54.103/";

// makes a call to server/isauthenticated to check if user is logged in. Returns bool
export async function checkAuthentication() {
	var res = await fetchJson(AUTONOTE_ADDRESS + "/isauthenticated");
	var resj = await res.json();
	if (!resj.isAuthenticated) {
		return false;
	}
	return true;
}

export function login() {
	chrome.tabs.create({
		url: AUTONOTE_ADDRESS + "/login"
	});
}

export async function uploadText(text) {
	await sendJson(
		AUTONOTE_ADDRESS + "/extension",
		{
			body: JSON.stringify({
				text: text
			})
		}
	)
}

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

/// modified version of `fetch` with specific options for json
export async function sendJson(resource, options) {
	return await fetch(
		resource,
		{
			...options,
			method: "POST",
			headers: [
				["Accept", "application/json"],
				["Content-Type", "application/json"]
			]
		}
	);
}