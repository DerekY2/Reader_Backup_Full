function b(e){chrome.scripting.executeScript({target:{tabId:e.id,allFrames:!0},files:["javascripts/readability.js","javascripts/jquery-3.4.1.min.js","javascripts/jquery-ui.min.js","javascripts/fullscreen.min.js","javascripts/tag-it.js","javascripts/content.js"]})}function e(e){b(e)}chrome.action.onClicked.addListener((t=>{e(t)})),chrome.contextMenus.create({id:"view-selection",title:"View in Reader",contexts:["selection"]}),a=chrome.contextMenus.create({id:"view-linked-page",title:"View the linked page using ReaderMode",contexts:["link"]}),chrome.contextMenus.onClicked.addListener((function(e){"view-selection"==e.menuItemId?chrome.tabs.query({active:!0},(function(e){b(e[0])})):"view-linked-page"==e.menuItemId&&e.linkUrl&&chrome.tabs.create({url:e.linkUrl,active:!1},(function(e){b(e)}))})),articles_checked_for_current_url=!1;