import { fetchSongs } from '@/api/graphql';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from '@/components/react-native';
import { useChangeDebounce } from '@/hooks/useChangeDebounce';
import { useHeaderSearch } from '@/hooks/useHeaderSearchBar';
import { useQuery } from '@/hooks/useQuery';

import { useDispatch } from '@/redux/lib';
import { update } from '@/redux/slice/media-player';

import { GetSongListResponse, SongFragment } from '@/types';

import { useMediaPlayer } from '@/library/music-player/hooks';
import { SongListView } from './ui/song-list-view';

const fetch = (args?: Record<string, unknown>) => fetchSongs(args);

const Separator = () => <View style={styles.separator} />;

const defaultSearchOptions = {
  placeholder: 'Find in songs',
};
export const SongsList = () => {
  const search = useHeaderSearch(defaultSearchOptions);

  const { data, error, loading, refetch } = useQuery<GetSongListResponse>(fetch, {
    input: {
      search: search,
    },
  });
  const mediaPlayer = useMediaPlayer();
  const dispatch = useDispatch();

  useChangeDebounce({
    callback: () => refetch?.(),
    input: search,
    trackChange: (prev, curr) => prev !== curr,
  });

  const onPlayHandler = (song: SongFragment) => {
    mediaPlayer.play(song);

    dispatch(
      update({
        trackList: data?.data ?? [],
      }),
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error...</Text>;
  }
  if (!data) return null;

  const { data: songList } = data;
  const { track } = mediaPlayer;
  return (
    <FlatList
      data={songList}
      keyExtractor={(item) => item.title}
      contentContainerStyle={track ? styles.listContainerWithSongWidget : styles.listContainer}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      renderItem={({ item: metadata }) => (
        <TouchableOpacity onPress={() => onPlayHandler(metadata)}>
          <SongListView
            data={metadata}
            isSelected={metadata.url === track?.url}
            isPaused={mediaPlayer.isPaused}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 6,
    marginLeft: 50 + 8,
    backgroundColor: '#2d2d2d',
    opacity: 0.5,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  listContainerWithSongWidget: {
    paddingTop: 10,
    paddingBottom: 50 + 12,
  },
});
