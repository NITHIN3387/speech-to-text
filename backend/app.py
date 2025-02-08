import os
from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from pydub import AudioSegment
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/speech', methods=['POST'])
def speech():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    input_filename = "temp_audio.webm"
    file = request.files['file']
    file.save(input_filename)

    try:
        audio = AudioSegment.from_file(input_filename, format="webm")
        output_filename = "temp_audio.wav"
        audio.export(output_filename, format="wav")
    except Exception as e:
        os.remove(input_filename)
        return jsonify({'error': f'Conversion failed: {str(e)}'}), 500

    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(output_filename) as source:
            audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    except Exception as e:
        text = f"Error during recognition: {str(e)}"
    finally:
        if os.path.exists(input_filename):
            os.remove(input_filename)
        if os.path.exists(output_filename):
            os.remove(output_filename)

    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4000, debug=True)
