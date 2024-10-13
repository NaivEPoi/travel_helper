import os
from flask import Flask, jsonify, send_from_directory
import cf_llm

app = Flask(__name__, static_folder='../dist')

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/location')
def process_location():
    # give information to LLM and get the event list
    return jsonify({"message": "Hello from Flask!"})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
@app.errorhandler(404)
def not_found(e):
  return send_from_directory(app.static_folder,'index.html')

if __name__ == '__main__':
    app.run(debug=True)