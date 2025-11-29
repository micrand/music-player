import data from './data/library.json';

import type { GetSongListResponse, SongFragment } from '@/types';
import { stringContains as contains, delay, filterList } from './utils';

type QueryOptions = Record<string, unknown>;

export const fetchSongs = (input?: QueryOptions): Promise<GetSongListResponse> => {
  return delay<GetSongListResponse>(data as GetSongListResponse).then((response) => {
    const search = ((input?.search as string) ?? '').toLowerCase();
    if (!search) return response;

    return {
      data: filterList(search, response.data, {
        filter: (metadata, search) => {
          return contains(metadata.title ?? '', search) || contains(metadata.artist ?? '', search);
        },
      }),
    };
  });
};

export const fetchFavouriteSongs = (input?: QueryOptions): Promise<GetSongListResponse> => {
  const filterFavourite = (data: SongFragment) => data.rating === 1;

  return delay<GetSongListResponse>(data as GetSongListResponse).then((response) => {
    const search = ((input?.search as string) ?? '').toLowerCase();
    if (!search) {
      return {
        ...response,
        data: response.data.filter((item) => filterFavourite(item)),
      };
    }
    return {
      data: filterList(search, response.data, {
        filter: (metadata, search) => {
          return contains(metadata.title ?? '', search) || contains(metadata.artist ?? '', search);
        },
      }).filter((item) => filterFavourite(item)),
    };
  });
};
