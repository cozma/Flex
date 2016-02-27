from flask import Flask, send_from_directory, request, redirect, url_for
import sys
import os
from C1Parser import getAllPurchase
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return send_from_directory("static", "index.html")


@app.route('/active', methods=['POST'])
def login():
	password = str(request.form['password'])
	username = str(request.form['email'])
	if (username == "test@email.com" and password == "test"):
		return send_from_directory("static", "stat.html")
	else:
		return send_from_directory("static", "index.html")

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

@app.route('/purchases', methods=['GET'])
def purchases():
 	return getAllPurchase()

@app.route('/cache', methods=['GET'])
def get_cache():
	ret = ""
	with open("cache/stats.json", 'r') as file:
		for line in file:
			ret = ret+line
	return ret

if __name__ == '__main__':
    app.run(debug=True)
