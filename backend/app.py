import os
from flask import Flask, jsonify, send_from_directory
import cf_llm

app = Flask(__name__, static_folder='../dist')

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/location')
def process_location(city, date):
    # give information to LLM and get the event list
    response = [
        {
            'name': 'City Tour',
            'location': 'Downtown',
            'timeAvailability': '9:00 AM - 5:00 PM',
            'expectedTime': '2 hours'
        },
        {
            'name': 'Museum Visit',
            'location': 'Main Street Museum',
            'timeAvailability': '10:00 AM - 6:00 PM',
            'expectedTime': '1.5 hours'
        },
        {
            'name': 'Concert',
            'location': 'Central Park',
            'timeAvailability': '6:00 PM - 9:00 PM',
            'expectedTime': '3 hours'
        },
        {
            'name': 'Food Festival',
            'location': 'City Square',
            'timeAvailability': '11:00 AM - 8:00 PM',
            'expectedTime': '2.5 hours'
        },
        {
            'name': 'Art Exhibition',
            'location': 'Art District',
            'timeAvailability': '12:00 PM - 5:00 PM',
            'expectedTime': '2 hours'
        },
        {
            'name': 'Sports Game',
            'location': 'Stadium',
            'timeAvailability': '3:00 PM - 7:00 PM',
            'expectedTime': '4 hours'
        }
    ]
    return jsonify(response)


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