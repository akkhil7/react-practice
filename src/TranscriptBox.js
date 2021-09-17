import React, { useState } from "react";
import moment from "moment";

const parseTime = (time) => {
  return Math.floor(Number(time.slice(0, time.length - 2)));
};

const parseTimeStamp = (timestamp) => {
  let minutes = 0;
  let seconds = timestamp;

  if (seconds > 60) {
    minutes = seconds / 60;
    seconds = seconds % 60;
    return `${minutes}:${seconds}`;
  } else {
    return `00:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
};

export default function TranscriptBox({ wordTimings, text, currentTime }) {
  const [showShare, setShowShare] = useState(false);
  const firstWordTime = parseTime(wordTimings[0].startTime);
  const lastWordTime = parseInt(wordTimings[wordTimings.length - 1].endTime);
  const active = currentTime >= firstWordTime && currentTime <= lastWordTime;

  const highlightWord = wordTimings.find((word) => {
    return (
      currentTime > parseTime(word.startTime) &&
      currentTime < parseTime(word.endTime)
    );
  });

  const formHighlightedSentence = () => {
    return (
      <p>
        {wordTimings.map(({ word }) =>
          word === highlightWord?.word ? (
            <mark>{word} &nbsp;</mark>
          ) : (
            <span>{word} &nbsp;</span>
          )
        )}
      </p>
    );
  };

  const toggleShowShare = () => {
    setShowShare((prev) => !prev);
  };
  return (
    <div
      className={`transcript-box ${active && "active"}`}
      onMouseEnter={toggleShowShare}
      onMouseLeave={toggleShowShare}
    >
      <div style={{ display: "flex" }}>
        <div className="timestamp">{parseTimeStamp(firstWordTime)}</div>
        <div className="sentence">
          {formHighlightedSentence()}
          <div className="share-btn-wrapper">
            {showShare && <button>Share</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
