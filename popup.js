let addButton = document.getElementById('addButton');

let filterInput = document.getElementById('filterInput');
let filterWord = document.getElementById('filterWord');

var wordArray = [];

function updateWordList() {
    chrome.storage.sync.get('wordList', function(result) {

        wordArray = result.wordList;

        var wordsHTML = "<ul>";
        for (var i = 0; i < wordArray.length; i++) {
            wordsHTML = wordsHTML + ("<li>" + wordArray[i] + "</li>");
        }
        wordsHTML = wordsHTML + ("</ul>");
        filterWord.innerHTML = wordsHTML;
    });
}


updateWordList();

function addCurrentString() {
    wordArray.push(filterInput.value);
    filterInput.value = '';
    
    chrome.storage.sync.set({wordList: wordArray}, function() {
        console.log('Words: ' + wordArray);
        updateWordList();
    });
};

addButton.onclick = function(){
    addCurrentString();
}

filterInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // Do more work
        addCurrentString();
    }
});