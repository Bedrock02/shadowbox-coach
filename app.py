from flask import Flask, render_template, jsonify, request
import random
app = Flask(__name__)


@app.route("/")
def main():
    return render_template('main.html')
