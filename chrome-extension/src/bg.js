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

var smartSearch = {
    "id": "search",
    "title": "Smart Search",
    "contexts": ["page"]
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.create(factItem);
chrome.contextMenus.create(smartSearch);
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
    else if (selectedText.menuItemId == "search")
    {

        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabArray) { 
                var tab_id = tabArray[0].id; 
                chrome.tabs.executeScript(tab_id,{
                    code: 'document.body.innerText;'
                    },receiveText);
            }
        );

    }
    
});

function summarizeText(text) {
    console.log("Summarize:" + text);
}

function factCheckText(text) {
    console.log("factCheckText: " + text);
}

//tabs.executeScript() returns the results of the executed script
//  in an array of results, one entry per frame in which the script
//  was injected.
function receiveText(resultsArray){
    console.log(resultsArray[0]);
}