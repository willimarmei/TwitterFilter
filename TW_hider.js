var wordDict = {};
var words = [];
var count = 0;

function hideOrShowPosts() {

    var posts = document.querySelectorAll('.tweet');

    for (var i = 0; i < posts.length; i++) {
        var badWords = 0;
        var postContent = posts[i].innerHTML;
        for (var j = 0; j < words.length; j++) {
            // If the word is turned on use it to hide
            if (wordDict[words[i]]) {
                if (postContent.toLowerCase().match(words[j].toLowerCase())) {
                    badWords++;
                }
            }
        }
        if (badWords >= count) {
            document.querySelectorAll('.tweet')[i].style.display = 'none';
        } else {
            document.querySelectorAll('.tweet')[i].style.display = 'block';
        }
    }
}


function updateContent() {
    chrome.storage.sync.get('wordList', function(result) {
        chrome.storage.sync.get('wordCount', function(result2) {
            wordDict = result['wordList'];
            words = Object.keys(result['wordList']);
            count = result2.wordCount;
            hideOrShowPosts();
        });
    });
}

updateContent();

setInterval(function(){ 
    updateContent();
}, 300);
