import sys
import json
import os


from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from flask_cors import CORS

UPLOAD_FOLDER = '/Users/johnshin/Downloads/test'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/foo", methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    with open(destination, 'rb') as ff:
        content = ff.read()
    # print(type(get_prediction(content, "skancare", "ICN1473922865667303602")))

    results = get_prediction(content, "skancare", "ICN1473922865667303602")
    out = {
        'score': results.payload[0].classification.score,
        'displayName': results.payload[0].display_name
    }

    return jsonify(out)

# @app.route("/foo", methods=['GET','POST'])
# def api():
#     # if request.method == 'POST':
#     print(request.files['file'])
#     #print(request.form)
#     x = request.files['file']
#     print(get_prediction(con, "skancare", "ICN1473922865667303602"))
#     return "got it"

def get_prediction(content, project_id, model_id):
  prediction_client = automl_v1beta1.PredictionServiceClient()

  name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
  payload = {'image': {'image_bytes': content }}
  params = {}
  request = prediction_client.predict(name, payload, params)

  return request  # waits till request is returned

if __name__ == '__main__':
    app.run()
