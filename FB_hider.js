

// setInterval(function(){ 
//     postsDiv = document.getElementById('recent_capsule_container');
//     posts = postsDiv.querySelectorAll('[role="article"]');

//     for (var i = 0; i < posts.length; i++) {
//         posts[i].style="display:none;";
//     }
// }, 500);

function updateContent() {
    chrome.storage.sync.get('wordList', function(result) {
        chrome.storage.sync.get('wordCount', function(result2) {

            // Set filter values from storage
            var words = Object.keys(result['wordList']);
            var count = result2.wordCount;


            posts = document.getElementsByClassName('userContentWrapper');

            for (var i = 0; i < posts.length; i++) {
                // Analyze post
                // console.log('\n\n POST:' + posts[i].innerHTML);
                // break;
                var badWords = 0;
                var postContent = posts[i].innerHTML;
                for (var j = 0; j < words.length; j++) {
                    if (postContent.toLowerCase().match(' ' + words[j].toLowerCase() + ' ')) {
                        badWords++;
                    }
                }
                if (badWords >= count) {
                    // posts[i].style='background-color: pink;';
                    posts[i].style='display: none;';
                    // posts[i].setAttribute("background-color", "pink");
                    // posts[i].setAttribute("display", "none");
                } else {
                    posts[i].style='display: block;';
                    // posts[i].setAttribute("display", "block");
                }
            }
        });
    });
}

updateContent();

setInterval(function(){ 
    updateContent();
}, 1000);

// // Load word list
// chrome.storage.sync.get('wordList', function(result1) {
//     // Load word count limit
//     chrome.storage.sync.get('wordCount', function(result2) {
//         wordDict = Object.keys(result1['wordList']);
//         wordCount = result2.wordCount;
//         alert('Filter words:' + wordDict + ' count:' + wordCount);

//     });
// });