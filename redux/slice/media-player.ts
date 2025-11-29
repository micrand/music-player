import type { SongFragmentList } from '@/api/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type MediaPlayerState = {
  trackList: SongFragmentList;
};

const initialState: MediaPlayerState = {
  trackList: [],
};

type TrackListUpdatePayload = {
  trackList: SongFragmentList;
};

const mediaPlayer = createSlice({
  name: 'media-player',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<TrackListUpdatePayload>) => {
      const { payload } = action;
      state.trackList = [...payload.trackList];
    },
  },
});

export const { update } = mediaPlayer.actions;
export default mediaPlayer.reducer;
