// Function to extract text from the webpage
function extractText() {
  return document.body.innerText;
}

// Function to send text to Flask server for prediction
function sendTextForPrediction(text) {
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
    alert('Predicted Class: ' + (data.predicted_class ? 'Safe' : 'Not Safe'));
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Extract text from the webpage and send it for prediction
const text = extractText();
sendTextForPrediction(text);
