import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faUndo,
  faPlay,
  faPause,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import transcript from "./transcriptData";
import Transcript from "./Transcript";

const SKIP_TIME = 5;

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const player = useRef();

  const togglePlayPause = () => {
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const onForward = () => {
    player.current.currentTime += SKIP_TIME;
  };

  const onRewind = () => {
    player.current.currentTime -= SKIP_TIME;
  };

  const onChangePlaybackRate = () => {
    let newSpeed = playbackRate;
    if (playbackRate + 0.5 > 2) {
      newSpeed = 0.5;
      setPlaybackRate(0.5);
    } else {
      newSpeed = playbackRate + 0.5;
    }
    setPlaybackRate(newSpeed);
    player.current.playbackRate = newSpeed;
  };

  const changeTime = () => {
    if (player) {
      setCurrentTime(player.current.currentTime);
    }
  };

  return (
    <div className="audio-player-wrapper">
      <div className="player-header">
        <audio
          src="https://zenprospect-production.s3.amazonaws.com/uploads/phone_call/uploaded_content/59e106639d79684277df770d.wav"
          ref={player}
          onTimeUpdate={changeTime}
        />
        <div className="audio-controls">
          <button onClick={onRewind} className="seek">
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button onClick={togglePlayPause} className="play-pause">
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button onClick={onForward} className="seek">
            {" "}
            <FontAwesomeIcon icon={faRedo} />{" "}
          </button>
          <button onClick={onChangePlaybackRate} className="pill-btn">
            {playbackRate}x
          </button>
        </div>
        <div>
          <button className="share-control">
            <FontAwesomeIcon icon={faShareAlt} />
            <span className="btn-text">Share</span>
          </button>
        </div>
      </div>
      <Transcript data={transcript} currentTime={currentTime} />
    </div>
  );
}

// time > startTime && time < endTime
