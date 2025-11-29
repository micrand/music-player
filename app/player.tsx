import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from '@/components/react-native';
import { FontSize } from '@/constants/tokens';
import { unknownImage } from '@/features/songs/ui/common';
import { useTheme } from '@/hooks/useThemeColor';
import { useMediaPlayer } from '@/library/music-player/hooks';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { PlayerController, ProgressBar } from '@/features/player';

const BottomSheetBar = ({ onClick }: { onClick?: () => void }) => (
  <TouchableHighlight style={styles.barContainer} onPress={onClick}>
    <View style={[styles.bar, { backgroundColor: useTheme().tabIconDefault }]} />
  </TouchableHighlight>
);

export default function Player() {
  const { track, isPaused, getAudioStats, pause, resume, updateSongPosition } = useMediaPlayer();
  const router = useRouter();
  const theme = useTheme();

  const [metadata, setMetadata] = useState<{ position: number; duration?: number }>();

  const onHomeNavigate = () => router.replace('/');

  if (!track) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Button onPress={onHomeNavigate} title="Go to Home" />
      </View>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const stats = getAudioStats();
      if (stats) {
        setMetadata(() => ({
          duration: stats.durationMillis,
          position: stats.positionMillis,
        }));
      }
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [isPaused, getAudioStats]);

  const onProgressChangeHandler = (positionMillis: number) =>
    updateSongPosition('slide', positionMillis);

  const { artwork, title, artist, rating } = track;
  return (
    <View style={styles.container}>
      <BottomSheetBar onClick={onHomeNavigate} />
      <View style={{ flex: 1 }}>
        <Image style={styles.image} source={artwork ? { uri: artwork } : unknownImage} />
        <View style={styles.details}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <IconSymbol color={rating ? theme.tint : theme.tabIconDefault} name="heart" size={16} />
          </View>
          {artist && <Text style={styles.artist}>{artist}</Text>}

          {metadata?.duration && (
            <ProgressBar
              elapsedTime={metadata.position}
              totalTime={metadata.duration}
              style={styles.progressBar}
              onChange={onProgressChangeHandler}
              onStart={pause}
              onStop={resume}
            />
          )}

          <PlayerController style={styles.controls} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 16,
    padding: 16,
  },
  barContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  bar: {
    width: 10 * 5,
    height: 10,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  details: {
    marginTop: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    fontWeight: 700,
    fontSize: FontSize.LARGE,
  },
  artist: {
    fontWeight: 300,
  },
  controls: { marginTop: 32 },
  progressBar: { marginTop: 32 },
});
