import { SongFragment } from '@/api/types';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from '@/components/react-native';
import { FontSize } from '@/constants/tokens';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { unknownImage } from './common';

type Props = {
  data: SongFragment;
  isPaused?: boolean;
  onPlay: () => void;
  onPause: () => void;
};
export const SongWidget = ({ data, isPaused, onPlay, onPause }: Props) => {
  const { title, artwork } = data;

  const router = useRouter();
  const onViewPlayerHandler = () => router.navigate('/player');

  return (
    <TouchableHighlight onPress={onViewPlayerHandler}>
      <View style={[styles.container]}>
        <Image style={styles.image} source={artwork ? { uri: artwork } : unknownImage} />
        <Text style={styles.title} theme="secondary" numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.controls}>
          {isPaused ? (
            <TouchableOpacity onPress={onPlay}>
              <IconSymbol color={'white'} size={20} name="pause" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPause}>
              <IconSymbol color={'white'} size={20} name="play" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#2c2c2cff',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 12,
  },
  title: {
    fontSize: FontSize.BASE,
    fontWeight: 500,
    flex: 1,
    marginRight: 10,
  },
});
