import { AudioStatus, useAudioPlayer } from 'expo-audio';
import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import { Track } from '@/api/types';
import { MediaPlayerContext } from './hooks/use-media-player';
import type { AudioStats, VolumeState } from './types';

const DEFAULT_AUDIO_STATS: AudioStats = { positionMillis: 0, durationMillis: 0 };

export const MediaPlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const audioStats = useRef<AudioStats>(DEFAULT_AUDIO_STATS);

  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const audio = useAudioPlayer(track?.url ?? null);

  useEffect(() => {
    const playbackStatusUpdateHandler = (status: AudioStatus) => {
      audioStats.current = {
        positionMillis: status.currentTime,
        durationMillis: status.duration,
      };
    };
    audio.addListener('playbackStatusUpdate', playbackStatusUpdateHandler);
    return () => {
      audio.removeListener('playbackStatusUpdate', playbackStatusUpdateHandler);
    };
  }, [audio]);

  // Unload sound when component unmounts
  useEffect(() => {
    return () => {
      audio.release();
    };
  }, [track, audio]);

  const onPauseHandler = useCallback(async () => {
    setIsPlaying(false);
    audio.pause();
  }, [audio]);

  const onVolumeHandler = useCallback(
    (state: VolumeState, volume?: number) => {
      let updatedVolume = audio.volume;
      if (volume !== undefined) {
        updatedVolume = volume;
      } else if (state === 'plus') {
        updatedVolume = Math.min(1, updatedVolume + 0.1);
      } else {
        updatedVolume = Math.max(0, updatedVolume - 0.1);
      }

      audio.volume = updatedVolume;
      setVolume(updatedVolume);
    },
    [audio],
  );

  const onResumeHandler = useCallback(() => {
    setIsPlaying(true);
    audio.play();
  }, [audio]);

  const onPlayHandler = useCallback(
    (_track: Track) => {
      if (_track.url === track?.url) {
        return;
      }
      setTrack(track);
    },
    [track],
  );

  const getAudioStats = useCallback(() => audioStats.current, []);

  const value = {
    play: onPlayHandler,
    pause: onPauseHandler,
    resume: onResumeHandler,
    track,
    isPaused: !isPlaying,
    getAudioStats: getAudioStats,
    setVolume: onVolumeHandler,
    volume: volume,
  };

  return <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>;
};
