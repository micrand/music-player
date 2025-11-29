import { createContext, useContext } from 'react';

import { Track } from '@/api/types';
import { MediaPlayerContextProps } from '../types';

export const MediaPlayerContext = createContext<MediaPlayerContextProps>({
  track: null,
  isPaused: false,
  volume: 1,
  isLooping: false,
  play: (_: Track) => Promise.resolve(),
  pause: () => undefined,
  resume: () => undefined,
  setVolume: () => undefined,
  toggleLooping: () => undefined,
  getAudioStats: () => null,
  updateSongPosition: () => undefined,
});

export const useMediaPlayer = () => useContext(MediaPlayerContext);
