const addButton = document.getElementById('addButton');
const filterInput = document.getElementById('filterInput');
const filterWord = document.getElementById('filterWord');
const filterCount = document.getElementById('filterCount');

var wordDict = {};

// class Word {
//     constructor(text, checked) {
//         this.text = text;
//         this.checked = checked;
//     }
// }

var checkUncheckWord = function() {
    // Set up
    var wordToChange = this.id;
    var checked = this.checked;
    wordDict[wordToChange] = checked;

    // Write to storage
    chrome.storage.sync.set({wordList: wordDict}, function() {
    });
}

function updateUI() {

    // Update the word list
    chrome.storage.sync.get('wordList', function(result) {
        wordDict = result['wordList'];

        var wordsHTML = "<ul>";
        for (var text in wordDict) {
            console.log(text);
            var checked = wordDict[text];
            if (checked == true) {
                wordsHTML += "<input type='checkbox' class='wordCheckBox' id='" + text + "' checked> " + text + " </input></br>";
            } else {
                wordsHTML += "<input type='checkbox' class='wordCheckBox' id='" + text + "'>" + text +"</input></br>";
            }
        }
        wordsHTML += "</ul>";
        filterWord.innerHTML = wordsHTML;

        // for (var i = 0; i < wordDict.length; i++) {
        //     if (wordDict[i].checked == true) {
        //         var start = "<input type='checkbox' class='wordCheckBox' id='" + wordDict[i].text + "' checked></input>";
                
        //     } else {
        //         var start = "<input type='checkbox' class='wordCheckBox' id='" + wordDict[i].text + "'></input>";
        //     }
        //     wordsHTML += start + wordDict[i].text + "</br>";
        // }
        // wordsHTML += ("</ul>");
        // filterWord.innerHTML = wordsHTML;

        // Add listeners to the checkboxes
        var lis = document.getElementsByClassName("wordCheckBox");
        for (var i = 0; i < lis.length; i++) {
            var listElement = lis[i];
            listElement.removeEventListener("click",checkUncheckWord);
            listElement.addEventListener("click",checkUncheckWord);
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