# travel_helper

## Get Started
### Frontend
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20
npm install
npm run dev
```
### Backend
```sh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask
flask run
```

### Deploy
build the Vite project and serve the static files using Flask
```sh
npm run build
mv dist/ backend/static/
```
Update your Flask app to serve the static files and frontend:
```Python
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='static')

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
```
