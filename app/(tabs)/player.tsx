"use client";

import { View, Text, StyleSheet } from "react-native";
import { useAudio } from "../audio-provider";
import AudioPlayerControls from "../../components/AudioPlayerControls";

export default function Player() {
  const { track, playing, play, pause } = useAudio();

  return (
    <View style={styles.container}>
      {track ? (
        <>
          <Text style={styles.title}>{track.title}</Text>
        </>
      ) : (
        <Text>No track selected</Text>
      )}

      <AudioPlayerControls
        playing={playing}
        onPlay={() => play()}
        onPause={pause}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 30 },
});
