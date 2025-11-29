"use client";

import { View, FlatList, Text, Pressable } from "react-native";
import { useAudio } from "../audio-provider";
import type { Track } from "../../types/track";

const tracks: Track[] = [
  {
    id: "1",
    title: "Sample Track",
    uri: require("../../assets/sample.mp3"),
  },
];

export default function Playlist() {
  const { play } = useAudio();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tracks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => play(item)}
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          >
            <Text>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
