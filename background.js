chrome.runtime.onInstalled.addListener(function()
{
		// chrome.storage.sync.set({filter: 'AARON'})

		// var word = chrome.storage.sync.get('filter');
		// console.log('test');
		// console.log(word.filter);
    // chrome.storage.sync.set({color: '#3aa757'}, function() {
    //   console.log("The color is green.");
    // });
    
    chrome.storage.sync.set({wordList: []}, function() {
        console.log("Add empty values");
    });
    
    // chrome.storage.sync.get('filter', function(result) {
    //     console.log('Value currently is ' + result.wordList);
    //     var wordsHTML = "<ul>";
    //     for (var i = 0; i < result.wordList.length; i++) {
    //         wordsHTML.push("<li>" + result.wordList[i] + "</li>");
    //     }
    //     wordsHTML.push("</ul>");
    //     filterWord.innerHTML = wordsHTML;
    // });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.facebook.com'},
        })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});