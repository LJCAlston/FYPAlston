// Function for checking fake news
function checkForFakeNews() {
  chrome.tabs.executeScript({
    code: `
      const text = document.body.innerText;
      fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Predicted Class:', data.predicted_class);
        alert('Predicted Class: ' + data.predicted_class);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    `
  });
}

// Listen for the extension during click event
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabInfo = tabs[0];
    if (tabInfo) {
      chrome.scripting.executeScript({
        target: { tabId: tabInfo.id },
        function: checkForFakeNews
      });
    } else {
      console.error("No active tab found.");
    }
  });
});
