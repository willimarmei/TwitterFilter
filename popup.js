let filter = document.getElementById('filter');

let filterInput = document.getElementById('filterInput');
let filterWord = document.getElementById('filterWord');

	chrome.storage.sync.get('filter', function(result) {
    console.log('Value currently is ' + result.filter);
    filterWord.innerHTML = result.filter;
  });

filter.onclick = function(element) {
	chrome.storage.sync.set({filter: String(filterInput.value)}, function() {
		console.log('Filter value is set to ' + filterInput.value);
  });

	// wait(2000);

	chrome.storage.sync.get('filter', function(result) {
    console.log('Value currently is ' + result.filter);
    filterWord.innerHTML = result.filter;
  });
  
};

