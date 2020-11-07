var contextMenuItem = {
    "id": "summarize",
    "title": "Summarize selection",
    "contexts": ["selection"]
};

var factItem = {
    "id": "fact",
    "title": "Fact check selection",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.create(factItem);
console.log("Test");

chrome.contextMenus.onClicked.addListener(function(selectedText) {
    console.log(selectedText.menuItemId);
    var pageURL = selectedText.pageUrl;
    var imageURL = selectedText.srcUrl;
    var text = selectedText.selectionText;
    var d = new Date();
    if (selectedText.menuItemId == "summarize") {
        summarizeText(text)
    } else if (selectedText.menuItemId == "fact")
        factCheckText(text)
});

function summarizeText(text) {
    console.log("Summarize:" + text);
}

function factCheckText(text) {
    console.log("factCheckText: " + text);
}

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Injecting content script(s)');
    //On Firefox document.body.textContent is probably more appropriate
    chrome.tabs.executeScript(tab.id,{
        code: 'document.body.innerText;'
        //If you had something somewhat more complex you can use an IIFE:
        //code: '(function (){return document.body.innerText})();'
        //If your code was complex, you should store it in a
        // separate .js file, which you inject with the file: property.
    },receiveText);
});

//tabs.executeScript() returns the results of the executed script
//  in an array of results, one entry per frame in which the script
//  was injected.
function receiveText(resultsArray){
    console.log(resultsArray[0]);
}