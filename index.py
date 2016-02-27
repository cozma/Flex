from flask import Flask, send_from_directory, request, redirect, url_for
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return send_from_directory("static", "index.html")


@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

if __name__ == '__main__':
    app.run(debug=True)
