import json

from flask import Flask
from flask_cors import CORS
from flask import request

import cv2

app = Flask(__name__)
CORS(app)

def process_img():
    # Load the image into a variable (this is a n x p array for each rgb value
    # of the image)
    img = cv2.imread("img/img2.jpg")

        # resize, so the img isn't so big:
    scale = 5
    width = int(img.shape[1] * scale / 100)
    height = int(img.shape[0] * scale / 100)

    resized_img = cv2.resize(
        img, (width, height), interpolation=cv2.INTER_AREA
    )

    # Dump each pixel into a list
    # Pixels start at the top right corner
    colors_list = []
    for row in resized_img:
        for column_rgb in row:
            rgb = {}
            rgb['r'] = int(column_rgb[2])
            rgb['g'] = int(column_rgb[1])
            rgb['b'] = int(column_rgb[0])
            colors_list.append(rgb)

    res = {
        "width": width,
        "height": height,
        "colors_list": colors_list
    }

    print("Processed a %d by %d image" % (width, height))

    return json.dumps(res)

@app.route('/')
def index():
    print("Processing image...")
    res = process_img()
    print("Processed!")
    return(res)

app.run()
