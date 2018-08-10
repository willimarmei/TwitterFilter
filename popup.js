const addButton = document.getElementById('addButton');
const filterInput = document.getElementById('filterInput');
const filterWord = document.getElementById('filterWord');
const filterCount = document.getElementById('filterCount');

var wordDict = {};

var checkUncheckWord = function() {
    // Set up
    var wordToChange = this.id;
    var checked = this.checked;
    wordDict[wordToChange] = checked;

    // Write to storage
    chrome.storage.sync.set({wordList: wordDict}, function() {
    });
}

var deleteWord = function() {
    // Set up
    var wordToDelete = this.id;
    delete wordDict[wordToDelete];

    // Write to storage
    chrome.storage.sync.set({wordList: wordDict}, function() {
        updateUI(); // On completioon
    });

}

function updateUI() {

    // Update the word list
    chrome.storage.sync.get('wordList', function(result) {
        wordDict = result['wordList'];

        var wordsHTML = "<ul style='padding-left:0;'>";
        for (var text in wordDict) {
            console.log(text);
            var checked = wordDict[text];
            if (checked == true) {
                var extraxString = "checked";
            } else {
                var extraxString = "";
            }
            wordsHTML += "<span style='cursor: pointer; margin-right:14px;' class='wordDeleteBox' id=" + text + ">&#10006;</span><input style='cursor: pointer;' type='checkbox' class='wordCheckBox' id='" + text + "' " + extraxString + "> " + text + " </input></br>";
        }
        wordsHTML += "</ul>";
        filterWord.innerHTML = wordsHTML;

        // Add listeners to the checkboxes
        var lis = document.getElementsByClassName("wordCheckBox");
        for (var i = 0; i < lis.length; i++) {
            var listElement = lis[i];
            listElement.removeEventListener("click",checkUncheckWord);
            listElement.addEventListener("click",checkUncheckWord);
        }

        // Add listeners to the delete boxes
        var boxes = document.getElementsByClassName("wordDeleteBox");
        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            box.removeEventListener("click",deleteWord);
            box.addEventListener("click",deleteWord);
        }
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

// Save the current word in the input field
function addCurrentString() {

    // const newWord = new Word(filterInput.value, true);
    wordDict[filterInput.value] = true;

    filterInput.value = '';
    
    chrome.storage.sync.set({wordList: wordDict}, function() {
        updateUI();
    });
};

// Save the current word limit
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