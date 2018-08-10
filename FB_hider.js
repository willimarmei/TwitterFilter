

// setInterval(function(){ 
//     elements = document.querySelectorAll('[role="article"]');

//     for (var i = 0; i < elements.length; i++) {
//         elements[i].style="display:none;";
//     }
// }, 500);

// // Load word list
// chrome.storage.sync.get('wordList', function(result1) {
//     // Load word count limit
//     chrome.storage.sync.get('wordCount', function(result2) {
//         wordDict = Object.keys(result1['wordList']);
//         wordCount = result2.wordCount;
//         alert('Filter words:' + wordDict + ' count:' + wordCount);

//     });
// });