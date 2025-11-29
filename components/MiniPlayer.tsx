"use client";

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAudio } from "../app/audio-provider";
import { router } from "expo-router";

export default function MiniPlayer() {
  const { track, playing } = useAudio();

  if (!track) return null;

  return (
    <Pressable
      onPress={() => router.push("/(tabs)/player")}
      style={styles.container}
    >
      <Text style={styles.title} numberOfLines={1}>
        {track.title}
      </Text>
      <Text style={styles.icon}>{playing ? "⏸" : "▶️"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: { fontWeight: "600" },
  icon: { fontSize: 20 },
});
