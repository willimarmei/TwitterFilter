const addButton = document.getElementById('addButton');
const filterInput = document.getElementById('filterInput');
const filterWord = document.getElementById('filterWord');
const filterCount = document.getElementById('filterCount');

var wordArray = [];

function updateUI() {

    // Update the word list
    chrome.storage.sync.get('wordList', function(result) {

        wordArray = result.wordList;

        var wordsHTML = "<ul>";
        for (var i = 0; i < wordArray.length; i++) {
            wordsHTML = wordsHTML + ("<li>" + wordArray[i] + "</li>");
        }
        wordsHTML = wordsHTML + ("</ul>");
        filterWord.innerHTML = wordsHTML;
    });

    // Update the drop down
    chrome.storage.sync.get('wordCount', function(result) {
        wordCount = result.wordCount;
        if (wordCount) {
            filterCount.value=wordCount;
        } else {
            filterCount.value=1;
        }
    });
}

// Initial call to update UI to setup the interface
updateUI();

function addCurrentString() {
    wordArray.push(filterInput.value);
    filterInput.value = '';
    
    chrome.storage.sync.set({wordList: wordArray}, function() {
        console.log('Words: ' + wordArray);
        updateUI();
    });
};

function addCurrentCount() {

    const wordCount = filterCount.options[filterCount.selectedIndex].value;

    chrome.storage.sync.set({wordCount: wordCount}, function() {
        // Complete
    });
}

// Event to save minimum word count
filterCount.onchange = function(){ addCurrentCount(); }

// Events to add current string
addButton.onclick = function(){ addCurrentString(); }
filterInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); addCurrentString();
    }
});