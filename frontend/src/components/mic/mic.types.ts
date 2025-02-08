import type { Dispatch, RefObject, SetStateAction } from "react";

export type AudioStreamRefType = RefObject<MediaStream | null>;
export type MediaRecorderRefType = RefObject<MediaRecorder | null>;
export type SetIsSpeekingType = Dispatch<SetStateAction<boolean>>;
export type setInputTextType = Dispatch<SetStateAction<string>>;

export interface MicProps {
  isSpeeking: boolean;
  audioStreamRef: AudioStreamRefType,
  mediaRecorderRef: MediaRecorderRefType,
  setIsSpeeking: SetIsSpeekingType,
  setInputText: setInputTextType
}


export type StopMicrophoneType = (audioStreamRef: AudioStreamRefType) => void;

export type HandleSpeekType = (
  audioStreamRef: AudioStreamRefType,
  mediaRecorderRef: MediaRecorderRefType,
  setIsSpeeking: SetIsSpeekingType,
  setInputText: setInputTextType
) => Promise<void>;

export type HandleStopType = (
  mediaRecorderRef: MediaRecorderRefType,
  audioStreamRef: AudioStreamRefType,
  setIsSpeeking: SetIsSpeekingType
) => void;
