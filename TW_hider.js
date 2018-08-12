var words = [];
var count = 0;

function hideOrShowPosts() {

    // Set filter values from storage
    
    // console.log(words);

    var posts = document.querySelectorAll('.userContentWrapper');

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
        console.log('Bad words: ' + badWords + ' Min count: ' + count);
        if (badWords >= count) {
            console.log('Hiding: ' + document.querySelectorAll('.userContentWrapper')[i].style);
            // posts[i].style.display="none";
            document.querySelectorAll('.userContentWrapper')[i].setAttribute("style", "background-color:pink");
            // posts[i].style.display = 'none';
            // document.querySelectorAll('.userContentWrapper')[i].style.background-color = 'pink';
            console.log('Hiding: ' + document.querySelectorAll('.userContentWrapper')[i].style);
            // posts[i].style='display: none;';
            // posts[i].setAttribute("background-color", "pink");
            // posts[i].setAttribute("display", "none");
            // document.getElementsByClassName('userContentWrapper')[0].setAttribute("display", "none");
            // document.getElementsByClassName('userContentWrapper')[0].style.display="none";
        } else {
            console.log('Showing');
            // posts[i].style.display = 'block';
            // posts[i].style='display: block;';
            // posts[i].setAttribute("display", "block");
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
}, 2000);
