import type {
  HandleSpeekType,
  HandleStopType,
  StopMicrophoneType,
} from "./mic.types";

const stopMicrophone: StopMicrophoneType = (audioStreamRef) => {
  if (audioStreamRef.current) {
    audioStreamRef.current.getTracks().forEach((track) => track.stop());
    audioStreamRef.current = null;
  }
};

export const handleSpeek: HandleSpeekType = async (
  audioStreamRef,
  mediaRecorderRef,
  setIsSpeeking,
  setInputText
) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioStreamRef.current = stream;
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorderRef.current = mediaRecorder;

  const audioChunks: BlobPart[] = [];
  setIsSpeeking(true);

  mediaRecorder.start();

  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });

  mediaRecorder.addEventListener("stop", () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    fetch("http://127.0.0.1:4000/speech", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setInputText(data.text);
      })
      .catch((error) => {
        alert("Error: " + error);
      })
      .finally(() => {
        setIsSpeeking(false);
        mediaRecorderRef.current?.stop();
        stopMicrophone(audioStreamRef);
      });
  });
};

export const handleStop: HandleStopType = (
  mediaRecorderRef,
  audioStreamRef,
  setIsSpeeking
) => {
  mediaRecorderRef.current?.stop();
  stopMicrophone(audioStreamRef);
  setIsSpeeking(false);
};
