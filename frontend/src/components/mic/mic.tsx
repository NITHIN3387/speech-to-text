import type { MicProps } from "./mic.types";
import { handleSpeek, handleStop } from "./mic.utils";

export const Mic = ({
  isSpeeking,
  audioStreamRef,
  mediaRecorderRef,
  setInputText,
  setIsSpeeking,
}: MicProps) => {
  return isSpeeking ? (
    <button
      className="bg-red-500 py-2 w-28 rounded-md text-white font-bold"
      onClick={() =>
        handleStop(mediaRecorderRef, audioStreamRef, setIsSpeeking)
      }
    >
      STOP
    </button>
  ) : (
    <button
      className="bg-blue-500 py-2 w-28 rounded-md text-white font-bold"
      onClick={() =>
        handleSpeek(
          audioStreamRef,
          mediaRecorderRef,
          setIsSpeeking,
          setInputText
        )
      }
    >
      SPEAK
    </button>
  );
};
