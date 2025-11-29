import { SongFragment, SongFragmentList, Track } from '@/types';

type ResponseType = {
  onNext: () => Track | null;
  onPrevious: () => Track | null;
};

const getTrackIndex = (track: SongFragment, trackList: SongFragmentList) => {
  return trackList.findIndex((_track) => _track.url === track.url);
};

export const useTrackController = (
  track: SongFragment | null,
  trackList: SongFragmentList,
): ResponseType => {
  const size = trackList.length;
  return {
    onNext: () => {
      if (!track || size == 1) return null;

      const index = getTrackIndex(track, trackList);
      if (index === -1) return null;

      return trackList[(index + 1) % size];
    },
    onPrevious: () => {
      if (!track || size == 1) return null;

      const index = getTrackIndex(track, trackList);
      if (index === -1) return null;

      return trackList[(index - 1 + size) % size];
    },
  };
};
