from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import re

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'tex'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Utility function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Utility function to save the uploaded file
def save_file(file):
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return file_path

# Utility function to parse LaTeX content
def parse_latex(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
        sections = re.findall(r'\\section\{(.+?)\}', content)
        return sections

# Endpoint for file uploads
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        file_path = save_file(file)
        sections = parse_latex(file_path)
        return jsonify({'message': 'File uploaded and parsed', 'sections': sections}), 200
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/')
def hello():
    return jsonify({"message": "Hello, World!"})

if __name__ == '__main__':
    app.run(debug=True)
