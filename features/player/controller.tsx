import { StyleSheet, TouchableOpacity, View } from '@/components/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useMediaPlayer } from '@/library/music-player/hooks';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useThemeColor';
import { useTrackController } from '@/library/track/hooks';
import { useTypedSelector } from '@/redux/lib';
import { Volume } from './volume';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export const Controller: FC<Props> = ({ style }) => {
  const { track, isPaused, isLooping, pause, resume, toggleLooping, play } = useMediaPlayer();
  const theme = useTheme();
  const trackList = useTypedSelector((state) => state.mediaPlayer.trackList);

  const { onNext, onPrevious } = useTrackController(track, trackList);

  const onNextHandler = () => {
    const _track = onNext();
    if (_track) play(_track);
  };
  const onPreviousHandler = () => {
    const _track = onPrevious();
    if (_track) play(_track);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.controller}>
        <TouchableOpacity onPress={onNextHandler}>
          <IconSymbol color="white" size={25} name="backward" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isPaused ? resume : pause}>
          <IconSymbol color="white" size={30} name={isPaused ? 'pause' : 'play'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPreviousHandler}>
          <IconSymbol color="white" size={25} name="forward" />
        </TouchableOpacity>
      </View>
      <Volume />
      <TouchableOpacity onPress={toggleLooping}>
        <IconSymbol color={isLooping ? theme.tint : theme.tabIconDefault} size={25} name="repeat" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
});
