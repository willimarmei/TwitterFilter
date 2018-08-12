chrome.runtime.onInstalled.addListener(function()
{
    
    // // Set Initial Conditions
    chrome.storage.sync.set({wordList: {}}, function() {
        // Complete
    });
    chrome.storage.sync.set({wordCount: 1}, function() {
        // Complete
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'twitter.com'},
        })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});