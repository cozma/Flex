from flask import Flask, send_from_directory
import flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    #return 'web/Hello World!'
    return send_from_directory("/Users/John/Desktop/vt_hacks_III/web", "index.html")

if __name__ == '__main__':
    app.run(debug=True)