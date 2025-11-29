import { StyleSheet, TouchableOpacity, View } from '@/components/react-native';
import { IconSymbol, type IconSymbolName } from '@/components/ui/IconSymbol';
import { useTheme } from '@/hooks/useThemeColor';
import { useMediaPlayer } from '@/library/music-player/hooks';

const VolBtn = ({ onPress, name }: { onPress: () => void; name: IconSymbolName }) => (
  <TouchableOpacity onPress={onPress}>
    <IconSymbol color="white" size={15} name={name} />
  </TouchableOpacity>
);

export const Volume = () => {
  const { volume, setVolume } = useMediaPlayer();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <VolBtn onPress={() => setVolume('minus')} name="speaker.minus" />
      <View style={[styles.volumeContainer, { backgroundColor: theme.tabIconDefault }]}>
        <View style={[styles.bar, { backgroundColor: theme.tint, width: `${volume * 100}%` }]} />
      </View>
      <VolBtn onPress={() => setVolume('plus')} name="speaker.plus" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  volumeContainer: {
    height: 5,
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'red',
  },
});
