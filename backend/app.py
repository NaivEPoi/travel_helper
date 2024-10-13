import os
# from flask_cors import CORS
from flask import Flask, jsonify, send_from_directory, request
import cf_llm

app = Flask(__name__, static_folder='../dist')
# CORS(app, origins="*")

@app.route('/api/location')
def process_location():
    city = request.args.get('location')
    date = request.args.get('date')
    print(city)
    # give information to LLM and get the event list
    response = cf_llm.get_attractions(city)
    print('response')
    print(response)
    # response = [
    #     {
    #         'name': 'City Tour',
    #         'location': 'Downtown',
    #         'timeAvailability': '9:00 AM - 5:00 PM',
    #         'expectedTime': '2 hours'
    #     },
    #     {
    #         'name': 'Museum Visit',
    #         'location': 'Main Street Museum',
    #         'timeAvailability': '10:00 AM - 6:00 PM',
    #         'expectedTime': '1.5 hours'
    #     },
    #     {
    #         'name': 'Concert',
    #         'location': 'Central Park',
    #         'timeAvailability': '6:00 PM - 9:00 PM',
    #         'expectedTime': '3 hours'
    #     },
    #     {
    #         'name': 'Food Festival',
    #         'location': 'City Square',
    #         'timeAvailability': '11:00 AM - 8:00 PM',
    #         'expectedTime': '2.5 hours'
    #     },
    #     {
    #         'name': 'Art Exhibition',
    #         'location': 'Art District',
    #         'timeAvailability': '12:00 PM - 5:00 PM',
    #         'expectedTime': '2 hours'
    #     },
    #     {
    #         'name': 'Sports Game',
    #         'location': 'Stadium',
    #         'timeAvailability': '3:00 PM - 7:00 PM',
    #         'expectedTime': '4 hours'
    #     }
    # ]
    # return jsonify(response)
    return response

@app.route('/api/plan', methods=['POST'])
def plan_trip():
    pass


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