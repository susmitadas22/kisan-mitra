from flask import request, jsonify, Flask
from flask_cors import CORS
from transformers import pipeline

pipe = pipeline("image-classification", model="gianlab/swin-tiny-patch4-window7-224-finetuned-plantdisease")

app = Flask(__name__)

CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    image = data['image'] 
    print(image)
    result = pipe(image)
    return jsonify(result)

@app.route('/', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(port=5000)

# run with gunicon,
# gunicorn -w 4 -b main:app