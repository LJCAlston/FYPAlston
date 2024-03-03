document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkButton');
  
    checkButton.addEventListener('click', function() {
      const text = prompt("Enter the text to check for fake news:");
      if (text !== null && text.trim() !== '') {
        fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        })
        .then(response => response.json())
        .then(data => {
          const message = data.predicted_class === 1 ? "The text you have input appears to be safe" : "The text you have input may contain fake news";
          alert(message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  });
