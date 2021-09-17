import React from "react";
import TranscriptBox from "./TranscriptBox";

export default function Transcript({ data, currentTime }) {
  return (
    <div className="transcript-wrapper">
      {data.transcript_text.map((item, idx) => {
        return (
          <TranscriptBox
            text={item}
            wordTimings={data.word_timings[idx]}
            currentTime={currentTime}
          />
        );
      })}
    </div>
  );
}
