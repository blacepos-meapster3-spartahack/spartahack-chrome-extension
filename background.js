// This file contains stuff that runs in the background and listens for events.

import { fetchJson, checkAuthentication, login, uploadText } from "./util.js"

// This is where the the context menu options are created
// https://developer.chrome.com/docs/extensions/reference/contextMenus/
chrome.runtime.onInstalled.addListener(async () => {
	chrome.contextMenus.create({
		id: "save_selection",
		title: "Save this selection",
		type: "normal",
		contexts: ["selection"]
	});
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "save_selection") {
		if (await checkAuthentication()) {
			console.log("Selection option was clicked");
			console.log(info.selectionText);
			await uploadText(info.selectionText);
		} else {
			login();
		}
	} 
});
