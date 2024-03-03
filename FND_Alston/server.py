from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the BERT model and tokenizer
model_path = "bert-base-uncased"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)
model.eval()

# Define function for making predictions
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        predicted_class = torch.argmax(outputs.logits).item()
    return predicted_class

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.json
    text = data['text']
    predicted_class = predict(text)
    return jsonify({"predicted_class": predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
