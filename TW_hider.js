var wordDict = {};
var words = [];
var count = 0;

function hideOrShowPosts() {

    var posts = document.querySelectorAll('.tweet');

    var hiddenCount = 0;

    for (var i = 0; i < posts.length; i++) {
        var badWords = 0;
        var postContent = posts[i].querySelectorAll('.tweet-text')[0].innerHTML;
        // console.log(postContent);
        // break;
        for (var j = 0; j < words.length; j++) {
            // If the word is turned on use it to hide
            // console.log('Checking if word:' + j + ' ' + words[j] + ' is checked');
            if (wordDict[words[j]]) {
                // console.log('Checking word: ' + words[j] + ' in: ' + postContent);
                if (postContent.toLowerCase().match(words[j].toLowerCase())) {
                    badWords++;
                }
            }
        }
        if (badWords >= count) {
            hiddenCount++;
            document.querySelectorAll('.tweet')[i].style.display = 'none';
            // posts[i].style.display = 'none';
        } else {
            document.querySelectorAll('.tweet')[i].style.display = 'block';
            // posts[i].style.display = 'block';
        }
    }
    console.log('Hid ' + hiddenCount + ' posts');
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
}, 1000);
