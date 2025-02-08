"use client";

import {
  type AudioStreamRefType,
  type MediaRecorderRefType,
  Mic,
} from "@/components/mic";
import { useRef, useState } from "react";

const HomePage = () => {
  const [isSpeeking, setIsSpeeking] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const mediaRecorderRef: MediaRecorderRefType = useRef(null);
  const audioStreamRef: AudioStreamRefType = useRef(null);

  return (
    <main className="h-dvh w-full flex flex-col justify-center items-center">
      <section className="w-1/2 flex flex-col gap-2">
        <h1 className="text-xl">Input:</h1>
        <div className="flex-1 flex gap-2">
          <input
            className="border border-black py-3 px-3 rounded-md flex-1"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
          />
          <Mic
            isSpeeking={isSpeeking}
            audioStreamRef={audioStreamRef}
            mediaRecorderRef={mediaRecorderRef}
            setIsSpeeking={setIsSpeeking}
            setInputText={setInputText}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
