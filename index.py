from flask import Flask, send_from_directory, request, redirect, url_for
import sys
import os
from C1Parser import getAllPurchase, getFood, getRetail, getOnline
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


@app.route('/refresh_purchases', methods=['GET'])
def refresh_purchases():
 	ret = getAllPurchase()
 	f = open("cache/purchases.json", 'w+')
	f.seek(0)
	f.write(ret)
	f.truncate()
	f.close()
	return ret


@app.route('/refresh_food', methods=['GET'])
def refresh_food():
 	ret = getFood()
 	f = open("cache/food.json", 'w+')
	f.seek(0)
	f.write(ret)
	f.truncate()
	f.close()
	return ret

@app.route('/refresh_retail', methods=['GET'])
def refresh_retail():
 	ret = getRetail()
 	f = open("cache/retail.json", 'w+')
	f.seek(0)
	f.write(ret)
	f.truncate()
	f.close()
	return ret

@app.route('/refresh_online', methods=['GET'])
def refresh_online():
 	ret = getOnline()
 	f = open("cache/online.json", 'w+')
	f.seek(0)
	f.write(ret)
	f.truncate()
	f.close()
	return ret

@app.route('/purchases', methods=['GET'])
def get_purchases():
	ret = ""
	with open("cache/purchases.json", 'r') as file:
		for line in file:
			ret = ret+line
	return ret

@app.route('/food', methods=['GET'])
def get_food():
	ret = ""
	with open("cache/food.json", 'r') as file:
		for line in file:
			ret = ret+line
	return ret

@app.route('/retail', methods=['GET'])
def get_retail():
	ret = ""
	with open("cache/retail.json", 'r') as file:
		for line in file:
			ret = ret+line
	return ret

@app.route('/online', methods=['GET'])
def get_online():
	ret = ""
	with open("cache/online.json", 'r') as file:
		for line in file:
			ret = ret+line
	return ret


@app.route('/<path:path>')
def static_proxy(path):
  return app.send_static_file(path)

if __name__ == '__main__':
    app.run(debug=True)
