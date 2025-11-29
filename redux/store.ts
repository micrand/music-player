import { configureStore } from '@reduxjs/toolkit';

import mediaPlayerSice from './slice/media-player';

export const store = configureStore({
  reducer: {
    mediaPlayer: mediaPlayerSice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
