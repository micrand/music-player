"use client";

import React, { createContext, useContext, useState } from "react";
import type { Track } from "../types/track";
import AudioService from "../services/audio-services";

type AudioContextType = {
  track: Track | null;
  playing: boolean;
  play: (track?: Track) => Promise<void>;
  pause: () => Promise<void>;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = async (newTrack?: Track) => {
    if (newTrack) {
      setTrack(newTrack);
      await AudioService.load(newTrack);
    }
    await AudioService.play();
    setPlaying(true);
  };

  const pause = async () => {
    await AudioService.pause();
    setPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ track, playing, play, pause }}>
      {children}
    </AudioContext.Provider>
  );
}
