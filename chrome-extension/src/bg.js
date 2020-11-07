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
    console.log("Summarize:");
}

function factCheckText(text) {
    console.log("factCheckText: ");
}