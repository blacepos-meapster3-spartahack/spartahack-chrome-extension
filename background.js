// This file contains stuff that runs in the background and listens for events.

import { fetchJson } from "./util.js"

// This is where the the context menu options are created
// https://developer.chrome.com/docs/extensions/reference/contextMenus/
chrome.runtime.onInstalled.addListener(async () => {
	chrome.contextMenus.create({
		id: "save_page",
		title: "Save this page",
		type: "normal",
		contexts: ["page"]
	});
	chrome.contextMenus.create({
		id: "save_link",
		title: "Save this link",
		type: "normal",
		contexts: ["link"]
	});
});

// Here is where where we 
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "save_page") {
		console.log("Text option was clicked");
		console.log(info);
		var res = await fetchJson("http://localhost:3000/isauthenticated");
		console.log(await res.json());
	}
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "save_link") {
		console.log("Link option was clicked");
		console.log(info);
	}
});