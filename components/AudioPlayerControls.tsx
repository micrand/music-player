import { View, Pressable, Text, StyleSheet } from "react-native";

export default function AudioPlayerControls({
  playing,
  onPlay,
  onPause,
}: {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={playing ? onPause : onPlay}
        style={styles.button}
      >
        <Text>{playing ? "Pause" : "Play"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 20, alignItems: "center" },
  button: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
});
