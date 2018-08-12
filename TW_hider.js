var words = [];
var count = 0;

function hideOrShowPosts() {

    // Set filter values from storage

    var posts = document.querySelectorAll('.tweet');

    for (var i = 0; i < posts.length; i++) {
        // console.log('inside a post');
        // Analyze post
        // console.log('\n\n POST:' + posts[i].innerHTML);
        // break;
        var badWords = 0;
        var postContent = posts[i].innerHTML;
        // console.log('test1');
        for (var j = 0; j < words.length; j++) {
            if (postContent.toLowerCase().match(' ' + words[j].toLowerCase() + ' ')) {
                // console.log('found a word');
                badWords++;
            }
        }
        // console.log('test2');
        // console.log('Bad words: ' + badWords + ' Min count: ' + count);
        if (badWords >= count) {
            console.log('hiding ' + i);
            document.querySelectorAll('.tweet')[i].style.display = 'none';
            // console.log('Hiding: ' + document.querySelectorAll('.userContentWrapper')[i].style);
            // document.querySelectorAll('.userContentWrapper')[i].setAttribute("style", "background-color:pink");
            // console.log('Hiding: ' + document.querySelectorAll('.userContentWrapper')[i].style);
        } else {
            // console.log('Showing');
            document.querySelectorAll('.tweet')[i].style.display = 'block';
        }
    }
}


function updateContent() {
    chrome.storage.sync.get('wordList', function(result) {
        chrome.storage.sync.get('wordCount', function(result2) {
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
