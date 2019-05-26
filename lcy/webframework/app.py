#!/usr/bin/env python3
from flask import *
import os
from datetime import datetime
import base64
from random import randint

IDENT_DIR = os.path.dirname(os.path.abspath(__file__)) + '/ident/'
app = Flask(__name__)


# fd == facedetect
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submitPic", methods=['GET', 'POST'])
def submitPic():
    picBase64 = request.form['data'][23:]
    if picBase64 is None or picBase64 == "":
        return "An error occurred when receiving your images."
    with open(IDENT_DIR + str(datetime.now())[:10] + str(randint(0,100)) + ".jpg", "wb") as f:
        f.write(base64.urlsafe_b64decode(picBase64.encode("utf-8")))
        f.close()
    return "ok!"


if __name__ == '__main__':
    app.run("0.0.0.0", port=5000, debug=True)
