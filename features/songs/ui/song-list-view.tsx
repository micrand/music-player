import { Image, StyleSheet, Text, View } from '@/components/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontSize } from '@/constants/tokens';
import { useTheme } from '@/hooks/useThemeColor';
import { SongFragment } from '@/types';
import { unknownImage } from './common';

type Props = {
  data: SongFragment;
  isSelected?: boolean;
  isPaused: boolean;
};

export const SongListView: React.FC<Props> = ({ data, isSelected, isPaused }) => {
  const { artwork, title, artist } = data;

  const color = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.image} source={artwork ? { uri: artwork } : unknownImage} />
        {isSelected && (
          <View style={styles.centeredAbsolute}>
            {isPaused ? (
              <IconSymbol color="white" size={15} name="pause" />
            ) : (
              <IconSymbol color="white" size={15} name="play" />
            )}
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} theme={isSelected ? 'highlight' : 'primary'}>
          {title}
        </Text>
        <Text style={styles.artist} theme="secondary">
          {artist}
        </Text>
      </View>
      <IconSymbol size={16} name="ellipsis" color={color.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    position: 'relative',
    height: 50,
    width: 50,
  },
  centeredAbsolute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -6 }, { translateY: -8 }],
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 12,
  },
  title: {
    fontSize: FontSize.SMALL,
    fontWeight: 500,
  },
  artist: {
    fontSize: FontSize.XSMALL,
  },
});
