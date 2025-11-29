import { Track } from '@/api/types';

export type VolumeState = 'plus' | 'minus';
export type PositionState = 'forward' | 'back' | 'slide';
export type AudioStats = {
  positionMillis: number;
  durationMillis: number | undefined;
};
export type AudioDataType = {
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
};
export type MediaPlayerContextProps = {
  track: Track | null;
  isPaused: boolean;
  volume: number;
  isLooping: boolean;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  setVolume: (state: VolumeState, value?: number) => void;
  toggleLooping: () => void;
  getAudioStats: () => AudioStats | null;
  updateSongPosition: (state: PositionState, millis?: number) => void;
};
