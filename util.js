
// TODO: move environment variables to .env (can dotenvy be used here? it's npm)
const AUTONOTE_ADDRESS = "http://autonote.tech:42069";

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
